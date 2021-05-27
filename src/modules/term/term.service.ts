import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parse } from 'path';
import { Repository } from 'typeorm';
import { CommonService } from '../common/common.service';
import { Seller } from '../sellers/entities/seller.entity';
import { Term } from './entities/term.entity';
import { TermValue } from './entities/termValue.entity';

@Injectable()
export class termService {
  constructor(
    @InjectRepository(TermValue, 'quykshop') private readonly termValueRepository: Repository<TermValue>,
    @InjectRepository(Term, 'quykshop') private readonly termRepository: Repository<Term>,
    @InjectRepository(Seller, 'quykshop') private readonly sellerRepository: Repository<Seller>,
    private commonService: CommonService
  ) { }

  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ frontend ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ start ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜



  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ End ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ frontend ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜



  //⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂ Shop admin panel ⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂
  //⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂    start   ⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂

  //🎁 creating category ==================>
  async createcategory(headers: any, body: any, user: any) {
    const { sid } = headers
    let reqBody = body
    try {
      if (!sid) throw new HttpException('Seller ID Not Found', HttpStatus.BAD_REQUEST)
      const checkExistCategory = await this.termValueRepository.createQueryBuilder("termValue")
        .leftJoin("termValue.terms", "term")
        .where("term.title = 'category'")
        .andWhere("termValue.title = :title", { title: reqBody.title })
        .andWhere("seller.id = :sid", { sid: sid })
        .getOne()
      if (checkExistCategory) throw new HttpException('This Category Already Exists', HttpStatus.BAD_REQUEST)

      reqBody['termTitle'] = 'Category'
      return await this.createTermValue(sid, reqBody, user)

    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //🎁 get category list ==================>
  async getCategoryList(headers: any, query: any) {
    try {
      const { sid } = headers
      let pageNumber
      let queryLimit

      //👀 for pagination
      query.current ? pageNumber = parseInt(query.current) : pageNumber = 1
      if (query.limit) { queryLimit = parseInt(query.limit) }
      else if (query.pageSize) { queryLimit = parseInt(query.pageSize) }
      else { queryLimit = 20 }

      let qb = this.termValueRepository.createQueryBuilder("termValue")
        .leftJoinAndSelect("termValue.childTermValues", "childTermValues")
        .leftJoinAndSelect("childTermValues.childTermValues", "grandChildTermValues")
        .leftJoin("termValue.terms", "terms")
        .leftJoin("termValue.seller", "seller")
        .where("terms.title = 'Category'")
        .andWhere("seller.id = :sid", { sid: sid })
        .andWhere("termValue.parentTermValue IS NULL")
      qb.take(queryLimit)
        .skip((pageNumber - 1) * queryLimit)
        .orderBy("termValue.order", "ASC")
      const [categoryList, count] = await qb.getManyAndCount()

      const iterate = (obj) => {
        Object.keys(obj).forEach(key => {
          if (obj[key] && obj[key].length === 0) delete obj[key]
          if (obj[key] && typeof obj[key] === 'object') {
            iterate(obj[key])
          }
        })

        return {
          data: obj,
          count
        }
      }

      return iterate(categoryList)
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //🎁 get category info by id
  async categoryInfoById(headers: any, catId: number) {
    try {
      return await this.termValueInfoById(catId)
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //🎁 creating brand ==================>
  async createBrand(headers: any, body: any, user: any) {
    const { sid } = headers
    let reqBody = body
    try {
      if (!sid) throw new HttpException('Seller ID Not Found', HttpStatus.BAD_REQUEST)
      const checkExistBrand = await this.termValueRepository.createQueryBuilder("termValue")
        .leftJoin("termValue.terms", "term")
        .leftJoin("termValue.seller", "seller")
        .where("term.title = 'category'")
        .andWhere("seller.id = :sid", { sid: sid })
        .getOne()

      if (checkExistBrand) throw new HttpException('This Brand Already Exists', HttpStatus.BAD_REQUEST)
      reqBody['termTitle'] = 'Brand'
      return await this.createTermValue(sid, reqBody, user)

    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //🎁 get brand list ==================>
  async getBrandList(headers: any, query: any) {
    try {
      const { sid } = headers
      let pageNumber
      let queryLimit

      //👀 for pagination
      query.current ? pageNumber = parseInt(query.current) : pageNumber = 1
      if (query.limit) { queryLimit = parseInt(query.limit) }
      else if (query.pageSize) { queryLimit = parseInt(query.pageSize) }
      else { queryLimit = 20 }

      let qb = this.termValueRepository.createQueryBuilder("termValue")
        .leftJoin("termValue.terms", "terms")
        .leftJoin("termValue.seller", "seller")
        .where("terms.title = 'Brand'")
        .andWhere("seller.id = :sid", { sid: sid })

      qb.take(queryLimit)
        .skip((pageNumber - 1) * queryLimit)
        .orderBy("termValue.order", "ASC")
      const [brandList, count] = await qb.getManyAndCount()

      const iterate = (obj) => {
        Object.keys(obj).forEach(key => {
          if (obj[key] && obj[key].length === 0) delete obj[key]
          if (obj[key] && typeof obj[key] === 'object') {
            iterate(obj[key])
          }
        })

        return {
          data: obj,
          count
        }
      }

      return iterate(brandList)
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //🎁 get brand info by id
  async brandInfoById(headers: any, catId: number) {
    try {
      return await this.termValueInfoById(catId)
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //🎁 creating Attribute
  async createAttribute(headers: any, body: any, user: any) {
    try {
      const { attrOptions } = body
      //👀 calling function for creating term
      const termStored = await this.createTerm(headers.sid, body, user)

      if (attrOptions && attrOptions.length != 0) {
        for (let i = 0; i < attrOptions.length; i++) {
          let termValueObj = new TermValue()
          termValueObj.title = attrOptions[i]

          //👀referencing attribute title
          termValueObj['termTitle'] = termStored.title

          //👀 calling function for creating termVAlue
          let termValueStored = await this.createTermValue(headers.sid, termValueObj, user)
        }
      }
      return termStored
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //🎁 get brand list ==================>
  async getAttributeList(headers: any, query: any) {
    try {
      const { sid } = headers
      let queryLimit = parseInt(query.pageSize) || 20
      let pageNumber = parseInt(query.current) || 1

      let qb = this.termRepository.createQueryBuilder("term")
        .select(["term.id", "term.title", "term.type", "term.description", "term.isDynamic", "term.frontendVisibility", "term.required", "term.toolTipText"])
        .leftJoinAndSelect("term.termValues", "termValues")
        .leftJoin("term.seller", "seller")
        .where("term.isDynamic = true")
        .andWhere("seller.id =:sid", { sid: sid })
      if (query.type) {
        qb.andWhere("term.type =:type ", { type: query.type })
      }
      if (query.frontendVisibility) {
        qb.andWhere("term.frontendVisibility=:frontendVisibility", { frontendVisibility: query.frontendVisibility })
      }
      if (query.required) {
        qb.andWhere("term.required=:required", { required: query.required })
      }
      if (query.title) {
        qb.andWhere("term.title like :title", { title: `%${query.title}%` })
      }
      qb.take(queryLimit)
        .skip((pageNumber - 1) * queryLimit)
        .orderBy("term.id", "DESC")

      let [data, count] = await qb.getManyAndCount();

      return {
        data,
        count
      }
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //🎁 get attribute info by id
  async attributeInfoById(headers: any, attId: number) {
    try {
      return await this.termRepository.createQueryBuilder("term")
        .leftJoinAndSelect("term.termValues", "termValues")
        .where("term.id = :tid", { tid: attId })
        .getOne() || {}
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //🎁 update attribute info by id
  async updateAttributeInfo(headers, attId, reqBody, user) {
    try {
      const attributeId = attId
      const { attrOptions } = reqBody

      let attributeInfo = await this.termRepository.findOne({ id: attributeId })
      if (!attributeInfo) throw new HttpException("Invalid Attribute ID", HttpStatus.BAD_REQUEST)

      if (attrOptions && attrOptions.length != 0) {
        for (let i = 0; i < attrOptions.length; i++) {

          let existTermValue = await this.termValueRepository.findOne({ where: { id: attrOptions[i]?.id } });
          if (!existTermValue) {
            let termValueObj = new TermValue()
            termValueObj.title = attrOptions[i].title
            //👀referencing attribute title
            termValueObj['termTitle'] = attributeInfo.title

            //👀 calling function for creating termVAlue
            let termValueStored = await this.createTermValue(headers.sid, termValueObj, user)
          } else {

            let termValueObj = new TermValue()
            termValueObj.title = attrOptions[i].title
            //👀 calling function for updating termVAlue
            let termValueUpdated = await this.updateTermValue(existTermValue.id, termValueObj, user)
          }

        }
      }

      //👀 calling function for updating term
      return await this.updateTerm(attributeId, reqBody, user)
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂    End   ⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂
  //⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂ Shop admin panel ⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂



  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ Master admin panel ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜   start   ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜



  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜    End   ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ Master admin panel ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜



  //※※※※※※※※※※※※※ Helper functions START ※※※※※※※※※※※※※※
  //🎁creating term Value
  async createTermValue(sellerId, reqBody, user) {
    try {
      let termValueObj = new TermValue();

      //🎁 referencing termId
      if (!reqBody.termTitle) throw new HttpException("Term Title Not Found", HttpStatus.BAD_REQUEST)
      let termInfo = await this.termRepository.find({ title: reqBody.termTitle })

      // 🎁 checking seller validity
      let sellerInfo = await this.sellerRepository.findOne({ id: sellerId })
      if (!sellerInfo) throw new HttpException("Invalid Seller Info", HttpStatus.BAD_REQUEST)

      termValueObj.terms = termInfo

      //👀formatting images====================>
      if (reqBody.icon || reqBody.image || reqBody.banner) {
        reqBody.images = {
          icon: {
            url: reqBody.icon,
            alt: parse(reqBody.icon)?.name
          },
          image: {
            url: reqBody.image,
            alt: parse(reqBody.image)?.name
          },
          banner: {
            url: reqBody.banner,
            alt: parse(reqBody.banner)?.name
          }
        }
        termValueObj.images = reqBody.images
      }

      //👀setting parent termValue EX-parent Category================>
      if (reqBody.parentTermValues) {
        let parentId = reqBody.parentTermValues[reqBody.parentTermValues.length - 1]
        let parentTvInfo = await this.termValueRepository.findOne({ where: { id: parentId } })
        if (!parentTvInfo) throw new HttpException('Invalid Parent TermValue Info', HttpStatus.BAD_REQUEST)
        termValueObj.parentTermValues = reqBody.parentTermValues
        termValueObj.parentTermValue = parentTvInfo
      }

      termValueObj.title = reqBody.title
      termValueObj.slug = await this.commonService.makeSlug(reqBody.title)
      termValueObj.seller = sellerInfo
      termValueObj.description = reqBody.description
      termValueObj.status = reqBody.status
      termValueObj.createdBy = user.uid
      termValueObj.order = reqBody.order || 99999

      let termValueStored = await this.termValueRepository.save(termValueObj)
      if (!termValueStored) throw new HttpException("Data Does Not Store", HttpStatus.BAD_REQUEST)
      return termValueStored

    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //updating term Value
  async updateTermValue(tvId, reqBody, user) {
    try {
      const termValueId = tvId

      //👀formatting images====================>
      if (reqBody.icon || reqBody.image || reqBody.banner) {
        reqBody.images = {
          icon: {
            url: reqBody.icon,
            alt: parse(reqBody.icon)?.name
          },
          image: {
            url: reqBody.image,
            alt: parse(reqBody.image)?.name
          },
          banner: {
            url: reqBody.banner,
            alt: parse(reqBody.banner)?.name
          }
        }

      }

      //👀setting parent termValue EX-parent Category================>
      if (reqBody.parentTermValues) {
        let parentId = reqBody.parentTermValues[reqBody.parentTermValues.length - 1]
        let parentTvInfo = await this.termValueRepository.findOne({ where: { id: parentId } })
        if (!parentTvInfo) throw new HttpException('Invalid Parent TermValue Info', HttpStatus.BAD_REQUEST)
        reqBody.parentTermValues = reqBody.parentTermValues
        reqBody.parentTermValue = parentTvInfo
      }

      if (reqBody.title) reqBody['slug'] = await this.commonService.makeSlug(reqBody.title)
      reqBody['updatedBy'] = user.uid
      reqBody['updatedAt'] = new Date()

      let termValueUpdated = await this.termValueRepository.update(termValueId, reqBody)
      if (!termValueUpdated) throw new HttpException("Data Does Not Update", HttpStatus.BAD_REQUEST)
      return termValueUpdated

    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //🎁 creating term
  async createTerm(sellerId, reqBody, user) {
    try {
      const { title, type, description, frontendVisibility, required, toolTipText } = reqBody
      let termObj = new Term()

      //👀 checking title duplicacy
      let checkExistTerm = await this.termValueRepository.findOne({ title: title })
      if (checkExistTerm) throw new HttpException('This Title Already Exists', HttpStatus.BAD_REQUEST)

      // 🎁 checking seller validity
      let sellerInfo = await this.sellerRepository.findOne({ id: sellerId })
      if (!sellerInfo) throw new HttpException("Invalid Seller Info", HttpStatus.BAD_REQUEST)

      termObj.title = title
      termObj.type = type
      termObj.description = description
      termObj.frontendVisibility = frontendVisibility
      termObj.required = required
      termObj.toolTipText = toolTipText
      termObj.createdBy = user.uid
      termObj.isDynamic = true
      termObj.seller = sellerInfo

      let termStored = await this.termRepository.save(termObj)
      if (!termStored) throw new HttpException("Data Does Not Store", HttpStatus.BAD_REQUEST)
      return termStored

    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //🎁 updating term
  async updateTerm(tid, reqBody, user) {
    console.log("request body=========", reqBody)
    try {
      const { title, type, description, frontendVisibility, required, toolTipText } = reqBody
      const termId = tid

      let termObj = new Term()
      //👀 checking title duplicacy
      let checkExistTerm = await this.termRepository.findOne({ title: title })
      if (checkExistTerm) throw new HttpException('This Title Already Exists', HttpStatus.BAD_REQUEST)

      reqBody['updatedBy'] = user.uid
      reqBody['updatedAt'] = new Date()

      let termUpdated = await this.termRepository.update(termId, reqBody)
      if (!termUpdated) throw new HttpException("Data Does Not Update", HttpStatus.BAD_REQUEST)
      return termUpdated
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //🎁 get termValue info by id
  async termValueInfoById(id: number) {
    try {
      return await this.termValueRepository.findOne({ id: id }) || {}
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }
  //※※※※※※※※※※※※※ Helper functions END ※※※※※※※※※※※※※※

}
