import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { Connection, Repository } from 'typeorm';
import { Setting } from './settingsSchema/setting.entity';
// import SSLCommerz from 'sslcommerz-nodejs'
// const SSLCommerz = require('sslcommerz-nodejs');
import * as SSLCommerz from 'sslcommerz-nodejs';


@Injectable()
export class SettingsService {

  constructor(
    @InjectRepository(Setting, 'quykshop') private readonly settingsRepository: Repository<Setting>,
    private cacheManager: RedisCacheService
  ) { }


  async createSettings(body,user) {
    try{
      let settingsStored
      for (const item in body) {
        let existKey = await this.settingsRepository.findOne({ key: item })
        if (existKey) {
          let settingsInfo = new Setting()
          settingsInfo.id = existKey.id
          settingsInfo.values = body[item]
          settingsInfo.updatedAt = new Date()
          settingsInfo.updatedBy = user.id
         settingsStored = await this.settingsRepository.save(settingsInfo)
          
        } else {
          let settingsInfo = new Setting()
          settingsInfo.key = item
          settingsInfo.values = body[item]
          settingsInfo.createdBy = user.id
          settingsStored = await this.settingsRepository.save(settingsInfo)
          
        }
      }
      this.setRedis()
      if(settingsStored) return {status:"success"}
    }catch (err) {
      return {status:"failed"}
    }
   
  }

  //🎁 putting settings value based on user query
  async getSettings(req) {  
    let { body } = req

    let settingsKeys = body.settings
   
    
    for (const item in settingsKeys) {
      settingsKeys[item] = await this.cacheManager.get(item)
    }

    return settingsKeys
  }


  //🎁 get all settings info to stored redis=================>
  async getAllSettings() { 
    return this.settingsRepository.find()
  }


  //🎁 update redis database==============>
  async setRedis() { 

    let allSettingsInfo = await this.getAllSettings() //👀 store all settings info into redis 
    allSettingsInfo?.forEach(async sett => {
      if (sett.values == null)
        await this.cacheManager.set(sett.key, [])
      if (sett.values != null)
        await this.cacheManager.set(sett.key, sett.values)
    })

    
  }


  findOne(id: number) {
    return `This action returns a #${id} setting`;
  }

  update(id: number, updateSettingDto) {
    return `This action updates a #${id} setting`;
  }

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }


  async sslCommerez(req) {
    let settings = {
      isSandboxMode: true,
      store_id: "ebhub601921e02424f",
      store_passwd: "ebhub601921e02424f@ssl"
    }
    let sslcommerz = new SSLCommerz(settings);

    let post_body = {};
    // post_body['isSandboxMode'] = true;
    // post_body['store_id'] = "ebhub601921e02424f";
    // post_body['store_passwd'] = "ebhub601921e02424f@ssl";
    // post_body['total_amount'] = 100.26;
    // post_body['currency'] = "BDT";
    // post_body['tran_id'] = "12345";
    // post_body['success_url'] = "http://192.168.0.17:3000/settings/successPayment";
    // post_body['fail_url'] = "http://192.168.0.17:3000/settings/failedPayment";
    // post_body['cancel_url'] = "http://192.168.0.17:3000/payment/cencelled";
    // post_body['emi_option'] = 0;
    // post_body['cus_name'] = orderin;
    // post_body['cus_email'] = "test@test.com";
    // post_body['cus_phone'] = "01700000000";
    // post_body['cus_add1'] = "customer address";
    // post_body['cus_city'] = "Dhaka";
    // post_body['cus_country'] = "Bangladesh";
    // post_body['shipping_method'] = "NO";
    // post_body['multi_card_name'] = ""
    // post_body['num_of_item'] = 1;
    // post_body['product_name'] = "Test";
    // post_body['product_category'] = "Test Category";
    // post_body['product_profile'] = "general";

    sslcommerz.init_transaction(post_body).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    }) 
  }

}

