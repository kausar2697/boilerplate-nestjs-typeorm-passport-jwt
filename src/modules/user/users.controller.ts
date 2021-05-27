import { Body, Controller, Get, HttpStatus, Post, Request, Res, UseGuards, UsePipes, ValidationPipe, HttpException, Param, Query } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from './users.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { adminLoginDto, shopLoginDto, shopSignupDto } from './dto/user.dto';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
    private authService: AuthService
  ) { }

  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ frontend ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ start ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜

  //🎁 shop End signup
  // @Post('signup')
  // async customerSignup(@Request() req) {
  //   return this.authService.customerSignup(req.body);
  // }

  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ End ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ frontend ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜



  //⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂ Shop admin panel ⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂
  //⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂    start   ⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂

  //🎁 shop Pannel signup
  @ApiTags('User')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Shop Admin Signup' })
  @Post('shop/signup')
  async shopSignup(@Body() body:shopSignupDto) {
    return this.authService.shopSignup(body);
  }

  //🎁 shop admin login
  @ApiTags('User')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Shop Admin Login' })
  @Post('shop/login')
  async shopLogin(@Body() body:shopLoginDto) {
    return this.authService.shopLogin(body);
  }
  

   //🎁 get associated seller list with user
   @UseGuards(JwtAuthGuard)
   @ApiTags('User')
   @ApiOperation({ summary: 'Associated seller list with user for "Shop Switching"' })
   @ApiBearerAuth()
   @Get('accociateSellers')
   async accociateSellers(@Request() req) {
     return this.authService.accociateSellers(req.user);
   }

  //⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂    End   ⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂
  //⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂ Shop admin panel ⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂

  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ Master admin panel ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜   start   ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜

  //🎁 master admin login
  @ApiTags('User')
  @ApiOperation({ summary: 'Master Admin Login' })
  @Post('admin/login')
  async adminLogin(@Body() body:adminLoginDto) {
    return this.authService.adminLogin(body);
  }


  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜    End   ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ Master admin panel ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜

 //🎁 get associated seller list with user
 @UseGuards(JwtAuthGuard)
 @ApiTags('User')
 @ApiOperation({ summary: 'Current User Info' })
 @ApiBearerAuth()
 @Get('current')
 async currentUserInfo(@Request() req) {
   return this.userService.currentUserInfo(req.user);
 }
}
