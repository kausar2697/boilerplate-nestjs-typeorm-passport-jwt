import { Catch, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from 'src/modules/sellers/entities/seller.entity';
import { Repository } from 'typeorm';
import { CommonService } from 'src/modules/common/common.service';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { UserRole } from 'src/modules/user-role/entities/user-role.entity';
import { UserVsSellerVsRole } from 'src/modules/user/entities/user_vs_seller_vs_role.entity';
import { shopLoginDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @InjectRepository(Seller, 'quykshop') private readonly sellerRepository: Repository<Seller>,
    @InjectRepository(User, 'quykshop') private readonly userRepository: Repository<User>,
    @InjectRepository(UserRole, 'quykshop') private readonly roleRepository: Repository<UserRole>,
    @InjectRepository(UserVsSellerVsRole, 'quykshop') private readonly userSellerRoleRepository: Repository<UserVsSellerVsRole>,
    private commonService: CommonService,
    private cacheManager: RedisCacheService
  ) { }


  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ frontend ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ start ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜

  //🎁 shop End signup
  // async customerSignup(body) {
  //   try {
  //     const smsSttingsMode = await this.cacheManager.get('sms_smsSettingsMode')
  //     let otpCode

  //     //👀 set otp based on sms settings mode
  //     if (smsSttingsMode.value == 'live') {
  //       otpCode = Math.floor(1000 + Math.random() * 9000)
  //     } else {
  //       otpCode = 1234 //otpCode set
  //     }

  //     let defaultUser = new User()

  //     let user = await this.userRepository.findOne
  //       ({
  //         where:
  //           [{ mail: body.mail },
  //           { cellNo: body.cellNo }]
  //       })


  //     //👀 sign in for mail
  //     if (body.mail) {
  //       if (user) {//if user exist

  //         //for forgot passowrd.........
  //         if (body.action == 'forgotPassword' && !body.otpCode) {

  //           let forgotUser = new User()
  //           forgotUser.otpCode = otpCode
  //           // forgotUser.otpCreationTime = Date.now() % 10000000000
  //           await this.userRepository.update({ id: user.id }, forgotUser)
  //           await this.sendEmailNotification(otpCode, user)
  //           return { status: "sendOtp", otp: forgotUser.otpCode }
  //         }


  //         if ((body.otpCode != undefined && body.action == "forgotPassword") || (body.otpCode != undefined && body.action == "forgotPassword" && body.passowrd)) {

  //           // console.log("result..........",result[0].otpCreationTime);
  //           // console.log("Date..........",Date.now()%10000000000);

  //           // const otpIntervaltTime = (Date.now()%10000000000 - result[0].otpCreationTime)
  //           // console.log("timeeeeeeeeeeeeeeeeeeeeee",otpIntervaltTime);
  //           //.....
  //           if (user.otpCode == body.otpCode) {
  //             user.otpCode = null

  //             if (user.password == '' || body.action == "forgotPassword") {
  //               if (body.password) {
  //                 user.id = user.id
  //                 user.password = await bcrypt.hash(body.password, 8);
  //                 console.log("useeeeeeeeeeeeeeeeeeeeeeeeeeee", user);

  //                 await this.userRepository.save(user)
  //                 const payload = { user: user.fullName, mail: user.mail, cellNo: user.cellNo, id: user.id, role: user.roles[0]['title'] }
  //                 return {
  //                   role: user.roles[0]['title'],
  //                   access_token: this.jwtService.sign(payload),
  //                 }

  //               }
  //               else {
  //                 return { status: "setYourPassword" }
  //               }
  //             }

  //           }
  //           else {
  //             throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
  //           }
  //         }


  //         if (user.otpCode != 0 && user.password == null && body.password == undefined && body.otpCode == undefined) {
  //           await this.sendEmailNotification(otpCode, user)
  //           return {
  //             status: "setOtp"
  //           }
  //         }

  //         if (user.otpCode == 0 && user.password == null && body.password == undefined) {  //password set for new user
  //           return {
  //             // user: user,
  //             status: "setPassword"
  //           }
  //         }

  //         if (user.password != null && body.password == undefined) {//if user is old user
  //           delete user.password
  //           return {
  //             status: "password"
  //           }

  //         }
  //         if (user.password != null && body.password) {
  //           if (await bcrypt.compare(body.password, user.password)) {//if password match 
  //             const payload = { user: user.fullName, mail: user.mail, cellNo: user.cellNo, id: user.id, role: user.roles[0]['title'] }
  //             return {
  //               role: user.roles[0]['title'],
  //               access_token: this.jwtService.sign(payload),
  //             }
  //           } else {//wrong password
  //             throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
  //           }
  //         }
  //         else if (body.otpCode && body.password == undefined) {//matching otpCode
  //           if (user.otpCode == body.otpCode) {//otp matched
  //             user.otpCode = 0
  //             await this.userRepository.save(user)
  //             delete user.password
  //             return {
  //               // user: user,
  //               status: "setPassword"
  //             }
  //           } else {//invalidOtp
  //             throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
  //           }
  //         }

  //         else if (body.password) {//user is setting up password
  //           if (body.role == undefined) body.role = "user"
  //           let userRoles = await this.roleRepository.findOne({ title: body.role })
  //           // user.roles = userRoles
  //           user.roles.push(userRoles)
  //           if (body.status == undefined) user.status = "pending"
  //           user.password = await bcrypt.hash(body.password, 8)
  //           await this.userRepository.save(user)
  //           const payload = { user: user.fullName, mail: user.mail, cellNo: user.cellNo, id: user.id, role: user.roles[0]['title'] }
  //           return {
  //             role: user.roles[0]['title'],
  //             access_token: this.jwtService.sign(payload),
  //           }
  //         }
  //       } else {//if user does not exist here once
  //         let newUser = new User()
  //         newUser.mail = body.mail
  //         newUser.otpCode = otpCode
  //         let storeuser = await this.userRepository.save(newUser)

  //         delete newUser.password
  //         await this.sendEmailNotification(otpCode, storeuser)
  //         return {
  //           status: "setOtp"
  //         }
  //       }
  //     }

  //     if (body.cellNo) {
  //       if (user) {//if user exist

  //         if (user.otpCode != 0 && body.otpCode == undefined) { //send otp again
  //           user.otpCode = otpCode
  //           await this.userRepository.save(user)
  //           delete user.otpCode
  //           await this.commonService.sendSms(`${otpCode} is your OTP for mobile verification - Ebhubon. }`, body.cellNo, Date.now().toString())
  //           return {
  //             status: "setOtp"
  //           }
  //         }
  //         if (user.otpCode == 0) { //send otp again
  //           user.otpCode = otpCode
  //           await this.userRepository.save(user)
  //           delete user.otpCode
  //           await this.commonService.sendSms(`${otpCode} is your OTP for mobile verification - Ebhubon.}`, body.cellNo, Date.now().toString())
  //           return {
  //             status: "setOtp"
  //           }
  //         }
  //         else if (body.otpCode) {//user is setting up otp for login
  //           if (user.otpCode == body.otpCode) {//otp matched
  //             user.otpCode = 0
  //             if (body.role == undefined) body.role = "user"
  //             let userRoles = await this.roleRepository.findOne({ title: body.role })
  //             // user.roles = userRoles
  //             user.roles.push(userRoles)
  //             if (body.status == undefined) user.status = "pending"
  //             await this.userRepository.save(user)
  //             // const payload = { user: user.cellNo, id: user.id, sl: user.id, role: user.roles[0]['title'] }
  //             const payload = { user: user.fullName, cellNo: user.cellNo, mail: user.mail, id: user.id, role: user.roles[0]['title'] }
  //             return {
  //               role: user.roles[0]['title'],
  //               access_token: this.jwtService.sign(payload),
  //             }
  //           } else {//invalidOtp
  //             throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);

  //           }
  //         }
  //       }
  //       else {//if user does not exist here once

  //         let newUser = new User()
  //         newUser.cellNo = body.cellNo
  //         newUser.otpCode = otpCode
  //         await this.userRepository.save(newUser)
  //         delete newUser.otpCode
  //         await this.commonService.sendSms(`${otpCode} is your OTP for mobile verification - Ebhubon. }`, body.cellNo, Date.now().toString())
  //         return {
  //           // user: newUser,
  //           status: "setOtp"
  //         }
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err)
  //     throw new HttpException(err.response, err.status)
  //   }
  // }

  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ End ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ frontend ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜



  //⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂ Shop admin panel ⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂
  //⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂    start   ⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂


  //🎁 shop admin signup
  async shopSignup(body: any) {

    try {
      let otpCode

      //👀 get sms and email settings mode value from redis
      const smsSttingsMode = await this.cacheManager.get('sms_smsSettingsMode')
      const emailSttingsMode = await this.cacheManager.get('email_emailSettingsMode')

      //👀 setting otp based on sms settings mode
      if (smsSttingsMode.value == 'live' && emailSttingsMode.value == 'live') {
        otpCode = Math.floor(1000 + Math.random() * 9000) //otpCode set
      } else {
        otpCode = 1234 //otpCode set
      }

      //👀 for shop admin login===================>

      //👀 check duplicate email for registration process==========>
      let existSeller = await this.sellerRepository.findOne
        ({ where: [{ mail: body.mail }, { cellNo: body.cellNo }] })
      if (existSeller) throw new HttpException('Already Have an Account', HttpStatus.FORBIDDEN)

      //👀 check already exist user but has not any shop==========>
      let user = await this.userRepository.findOne
        ({ where: [{ mail: body.mail }, { cellNo: body.cellNo }] })

      let defaultUser = new User()

      if (body.mail || body.cellNo) {

        //👀 seller is half registered requesting to insert password ==============>
        if (user && user.password != null && body.shopTitle == undefined && body.password == undefined) {
          return { status: "password" }
        }

        //👀 half registered seller is resuming registration by seting shopName ==============>
        else if (user && user.password != null && body.shopTitle) {

          if (body.role == undefined) body.role = "shop-admin"
          let userRoles = await this.roleRepository.findOne({ title: body.role })
          if (body.status == undefined) user.status = "pending"

          try {
            let seller = new Seller();
            if (!body.sellerType) throw new HttpException('Seller Type Not Found', HttpStatus.BAD_REQUEST)
            seller.shopTitle = body.shopTitle
            seller.shopType = body.sellerType
            seller.slug = (body.shopTitle).toString().toLowerCase()
              .replace(/\s+/g, '-')           // Replace spaces with -
              .replace(/['"<>@+?.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
              .replace(/\-\-+/g, '-')         // Replace multiple - with single -
              .replace(/^-+/, '')             // Trim - from start of text
              .replace(/-+$/, '');

            user.cellNo ? seller.cellNo = user.cellNo : ''
            user.mail ? seller.mail = user.mail : ''
            seller.status = "pending"
            seller.createdBy = user.id
            user.cellNo ? seller.cellVarificationStatus = true : ''
            user.mail ? seller.emailVarificationStatus = true : ''
            let newSeller = await this.sellerRepository.save(seller)

            if (newSeller) { //update seller for inserting shopid===============>
              let sellUpdate = new Seller()
              let shopNumber = 100000 + newSeller.id
              sellUpdate.id = newSeller.id
              sellUpdate.shopId = `EB${shopNumber}`
              await this.sellerRepository.save(sellUpdate)
            }

            //👀 associated user seller and role with inserted seller
            let userSellerRole = new UserVsSellerVsRole()
            userSellerRole.role = userRoles
            userSellerRole.seller = newSeller
            userSellerRole.user = user
            let userSellerRoleStored = await this.userSellerRoleRepository.save(userSellerRole)
            const payload = { mail: user.mail, id: user.id }
            return { //return token
              status: "ok",
              access_token: this.jwtService.sign(payload),
            }
          } catch (err) {
            throw new HttpException(err.response, err.status)
          }
        }

        //👀 only created account but not complete any further process
        else if (user) {

          if (!body.otpCode && body.password == undefined && body.shopTitle == undefined) {
            defaultUser.id = user.id
            defaultUser.otpCode = otpCode
            await this.userRepository.save(defaultUser)
            body.mail ? await this.sendEmailNotification(otpCode, body) : await this.commonService.sendSms(`${otpCode} is your OTP for mobile verification - Ebhubon.`, body.cellNo, Date.now().toString())
            return { status: 'setOtp' }
          }

          //👀 user otp and database otp comparing
          else if (body.otpCode && body.password == undefined) {
            if (user.otpCode == body.otpCode) {
              user.otpCode = 0
              let newUser = await this.userRepository.save(user)
              return {
                status: "setPassword"
              }
            } else {//otpCode is not valid
              throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST)
            }
          }

          //👀 existing user checking password for set shop===================>
          else if (user.password != null && body.password && body.shopTitle == undefined) {
            if (await bcrypt.compare(body.password, user.password)) {
              return { status: "setShop" }
            } else {
              throw new HttpException('Password Incorrect', HttpStatus.BAD_REQUEST)
            }
          }

          //👀 user is setting up password===================>
          else if (body.password && body.shopTitle == undefined) {
            user.password = await bcrypt.hash(body.password, 8)
            let newUser = await this.userRepository.save(user)
            return { status: "setShop" }
          }
        }

        //👀creating user for the first time
        else {
          body.otpCode = otpCode
          let newUser = await this.userRepository.save(body)
          body.mail ? await this.sendEmailNotification(otpCode, body) : await this.commonService.sendSms(`${otpCode} is your OTP for mobile verification - Ebhubon.`, body.cellNo, Date.now().toString())
          return {
            status: 'setOtp'
          }
        }

      }
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }


  //🎁 shop log in
  async shopLogin(body) {
    try {
      //👀 check user validity as shop admin==========>
      let user = await this.userRepository.createQueryBuilder("user")
        .leftJoin("user.userSellerRole", "userSellerRole")
        .leftJoin("userSellerRole.role", "role")
        .leftJoin("role.userPermission", "userPermission")
        .where("userPermission.title = 'user | login to shopPanel'")
        .andWhere("user.mail = :mail OR user.cellNo = :cellNo", { mail: body.mail, cellNo: body.cellNo })
        .getOne()

      if (!user) throw new HttpException('User Does Not Exit / Have Permission', HttpStatus.BAD_REQUEST)

      //👀 existing seller asking for password permission==========>
      if (body.password == undefined) {
        return { status: 'password' }
      }

      //👀 checking inserted password is correct or not==============>
      if (await bcrypt.compare(body.password, user.password)) {
        const payload = { mail: user.mail, cellNo: user.cellNo, uid: user.id }
        return {
          status: "ok",
          access_token: this.jwtService.sign(payload),
        }
      }
      else {//password miss-matched ============>
        throw new HttpException('Password Is Not Correct', HttpStatus.BAD_REQUEST)
      }

    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //🎁 get associated seller list with user
  async accociateSellers(user) {
    try {
      const { uid } = user
      if (!uid) throw new HttpException('User Id Not Found', HttpStatus.BAD_REQUEST)
      const accociateSellerList = await this.userSellerRoleRepository.createQueryBuilder("userSellerRole")
        .leftJoin("userSellerRole.role", "role")
        .addSelect(["role.id", "role.title"])
        .leftJoin("userSellerRole.seller", "seller")
        .addSelect(["seller.id", "seller.shopTitle"])
        .leftJoin("userSellerRole.user", "user")
        .where("user.id = :uid", { uid: user.uid })
        .getMany()
      if (!accociateSellerList) throw new HttpException('No Shop Found', HttpStatus.BAD_REQUEST)
      return accociateSellerList
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂    End   ⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂
  //⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂ Shop admin panel ⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂


  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ Master admin panel ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜   start   ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜

  //🎁 master admin login
  async adminLogin(body: any) {
    const { mail, cellNo, password } = body
    try {
      //👀 checking log in permission
      const user = await this.userRepository.createQueryBuilder("user")
        .leftJoinAndSelect("user.userSellerRole", "userSellerRole")
        .leftJoinAndSelect("userSellerRole.role", "role")
        .leftJoinAndSelect("role.userPermission", "userPermission")
        .where("userPermission.title = 'user | login to adminPanel' ")
        .andWhere("user.mail = :mail OR user.cellNo = :cellNo", { mail: mail, cellNo: cellNo })
        .getOne()

      if (!user) throw new HttpException('User Does Not Exit / Have Permission', HttpStatus.BAD_REQUEST)

      //👀 checking password for admin loging
      if (await bcrypt.compare(password, user.password)) {
        const payload = { mail: user.mail, cell: user.cellNo, uid: user.id, role: user?.userSellerRole[0]?.role?.title }
        return { //👀 return token
          status: "ok",
          role: user?.userSellerRole[0]?.role?.title,
          access_token: this.jwtService.sign(payload),
        }
      }
      else {
        throw new HttpException('Password Is Not Correct', HttpStatus.BAD_REQUEST)
      }
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }


  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜    End   ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ Master admin panel ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜

  //※※※※※※※※※※※※※ Helper functions START ※※※※※※※※※※※※※※

  async validateUser(username: string, pass: string): Promise<any> {
    var user = await this.usersService.findUser(username);
    try {
      const match = await bcrypt.compare(pass, user.password);
      if (user && match) {
        const result = user;
        return result;
      }
    } catch (err) {
      return null;
    }
  }

  async sendEmailNotification(otpCode, user) {
    const otp = otpCode
    console.log("otp============", otp)
    if (user.mail) {
      let subject = `Ebhubon:Verify Your Identity`
      let customerEmail = user.mail

      let emailBody = `<div style="background:#ccc ; width: 100% ; padding:30px" >
    <div style="background:white; width:500px;margin: 30px auto;">
    <div class="table-responsive" style="margin: 20px auto;border: 1px solid #ccc;border-top:5px solid #cc2027; padding: 30px;">
        <div style="overflow: hidden;padding-bottom: 10px;">
        <div style="overflow: hidden">
            <div style="width: 70%;float: left">
                <h1 style="margin: 0;text-transform:uppercase; font-weight: 400;font-size: 20px">Ebhubon</h1>
                <p style="margin: 0;; font-weight: 300;letter-spacing: 1px;font-size:10px; text-transform: uppercase;letter-spacing: 1.5px;color: #8c8888;">
                    Best Shopping
                </p>
            </div>

            <div style="width: 30%;float: right;margin: 0;text-align:right;">
                <a href="https://ebhubon.com">
                    <img style="width: 50%" src="https://ebhubon.com/evubon-logo.png">
                </a>
            </div>
        </div>
    </div>

    <div style="width:450px;  margin:55px auto;">
        <div style="height:60px; border-bottom:2px solid  #cc2027;text-align:center; margin:auto; font-size:25px">
            <h3>Verify Your Identity!</h3>
        </div>
        <div style="text-align:center; margin-bottom:40px">
            <h4 style="color:#000">
                Please enter below mentioned 4 digit code into the Email Verification page
            </h4>
            <p style="background-color:#DCE2E1; width:150px; padding:5px; font-size:40px;color: black; font-weight:600; margin:auto; ">
               ${otpCode}
            </p>
        </div>
    </div>

    <div style="border-top:2px solid  #cc2027;color: #888787; text-align: center;">
        <p style="margin: 0;padding-top:5px;">
            Do let us know if you have any feedback or query. Feel free to call us at  <a style="color: #568cef;" href="tel:096 7878 5151">096 7878 5151</a>; we're here for you!
        </p>
    </div>
</div>
</div>`


      await this.commonService.sendEmail(customerEmail, subject, emailBody)
    }

  }
  //※※※※※※※※※※※※※ Helper functions END ※※※※※※※※※※※※※※
}







