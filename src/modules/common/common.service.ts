import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as nodemailer from 'nodemailer'
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import * as SSLCommerz from 'sslcommerz-nodejs';

@Injectable()
export class CommonService {
  constructor(
    private cacheManager: RedisCacheService
  ) { }

  //🎁 send sms to the phone------

  async sendSms(message: string, phoneNo: string, csmsId: string) {
    console.log("sms-------------------------send");
    let api_token = await this.cacheManager.get('sms_apiToken')
    let sid = await this.cacheManager.get('sms_sid')
    let apiUrl = await this.cacheManager.get('sms_url')
    let mode = await this.cacheManager.get('sms_smsSettingsMode')

    if (mode.value == 'live') {
      console.log("sms-------------------------live");

      // axios.post('https://smsplus.sslwireless.com/api/v3/send-sms', {
      axios.post(apiUrl.value, {
        // api_token: "8ae75508-2e94-472d-be80-f255267b9e78",
        // sid: "EBHUBONMASK",
        api_token: api_token.value,
        sid: sid.value,
        sms: message,
        msisdn: phoneNo,
        csms_id: csmsId
      })
        .then(function (response) {

        })
        .catch(function (error) {
          console.log("error..........................", error);
        });
    }
  }


  //🎁 send email -----------
  async sendEmail(mail: string, subject, body: string) {
    console.log("email send---------------");

    let host = await this.cacheManager.get('email_host')
    let port = await this.cacheManager.get('email_port')
    let secure = await this.cacheManager.get('email_secure')
    let user = await this.cacheManager.get('email_authUser')
    let pass = await this.cacheManager.get('email_authPassword')
    let email_from = await this.cacheManager.get('email_from')
    let mode = await this.cacheManager.get('email_emailSettingsMode')
    if (mode.value == 'live') {
      console.log("email------------live");

      let transporter = nodemailer.createTransport({
        // service: 'gmail',
        // host: "email-smtp.ap-southeast-1.amazonaws.com",
        // port: 465,
        // secure: true, // true for 465, false for other ports
        // auth: {
        //     user: 'AKIAVCV3GY5EP6MOLWGS', // generated ethereal user
        //     pass: 'BG4nLudyvEB6QQfUc5jWZfPsp1L/8NQRpR8S7/GWZ2Qa', // generated ethereal password
        // },

        host: host.value,
        port: port.value,
        secure: true, // true for 465, false for other ports
        auth: {
          user: user.value, // generated ethereal user
          pass: pass.value, // generated ethereal password
        },
      });
      var mailOptions = {
        // from: 'noreply@ebhubon.com',
        from: email_from.value,
        to: mail,
        subject: subject,
        html: body
      };
      console.log('to email===', mail);
      // send mail with defined transport object
      transporter.sendMail(mailOptions, function (err, info) {
        if (err)
          console.log('email error===', err)
        else
          console.log('email info===', info);
      })
    }

  }


  //🎁 sslcommerz Payment--------------------------------
  async sslCommerezPayment(postBody: object) {
    let test_storeId = await this.cacheManager.get('ssl_test_storeId')
    let test_storePassword = await this.cacheManager.get('ssl_test_storePassword')
    let live_storeId = await this.cacheManager.get('ssl_live_storeId')
    let live_storePassword = await this.cacheManager.get('ssl_live_storePassword')
    let mode = await this.cacheManager.get('ssl_paymentSettingsMode')

    if (mode.value == 'test') {
      let post_body = postBody
      let settings = {
        isSandboxMode: true,
        // store_id: "ebhub601921e02424f",
        // store_passwd: "ebhub601921e02424f@ssl"
        store_id: test_storeId.value,
        store_passwd: test_storePassword.value
      }
      let sslcommerz = new SSLCommerz(settings);
      const res = await sslcommerz.init_transaction(post_body)
      return res
    }

    if (mode.value == 'live') {
      let post_body = postBody
      let settings = {
        isSandboxMode: false,
        // store_id: "ebhub601921e02424f",
        // store_passwd: "ebhub601921e02424f@ssl"
        store_id: live_storeId.value,
        store_passwd: live_storePassword.value
      }
      let sslcommerz = new SSLCommerz(settings);
      const res = await sslcommerz.init_transaction(post_body)
      return res
    }

  }

  //🎁 making slug
  async makeSlug(title: string) {
    let preparedSlug = title.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/['"<>@+?.,\/#!$%\^&\*;:{}=\_`~()©®℗™℃℉§‡⁑⁂‰⁈‱⁒⁍⁌ª⁊^µ♪※¸¶±é½]/g, '-')
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text

    preparedSlug = preparedSlug + '-' + String(Date.now())
    return preparedSlug

  }


  create(createCommonDto) {
    return 'This action adds a new common';
  }

  findAll() {
    return `This action returns all common`;
  }

  findOne(id: number) {
    return `This action returns a #${id} common`;
  }

  update(id: number, updateCommonDto) {
    return `This action updates a #${id} common`;
  }

  remove(id: number) {
    return `This action removes a #${id} common`;
  }
}
