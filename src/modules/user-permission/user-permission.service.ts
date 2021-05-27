import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserPermissionDto } from './dto/create-user-permission.dto';
import { UpdateUserPermissionDto } from './dto/update-user-permission.dto';
import { UserPermission } from './entities/user-permission.entity';

@Injectable()
export class UserPermissionService {
  constructor(
    @InjectRepository(UserPermission, 'quykshop') private readonly permissionRepository: Repository<UserPermission>
  ) { }

  remove(id: number) {
    return `This action removes a #${id} userPermission`;
  }


  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ frontend ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ start ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜



  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ End ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ frontend ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜



  //⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂ Shop admin panel ⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂
  //⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂    start   ⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂



  //⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂    End   ⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂
  //⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂ Shop admin panel ⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂



  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ Master admin panel ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜   start   ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜

  //🎁 create user permission
  async create(body, user) {
    try {
      let userPermissionInfo = new UserPermission
      if (!body.title) throw new HttpException('Permission Title Not Found', HttpStatus.BAD_REQUEST)
      if (body.title && await this.permissionRepository.findOne({ title: body.title })) throw new HttpException('Duplicate Entry', HttpStatus.BAD_REQUEST)
      userPermissionInfo.title = body.title
      userPermissionInfo.status = body.status
      // userPermissionInfo.createdBy = user.id
      let permissionStore = await this.permissionRepository.save(userPermissionInfo)
      if (!permissionStore) throw new HttpException("Data Does Not Store", HttpStatus.BAD_REQUEST)
      return permissionStore
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }


  //🎁 get all permission list
  async findAll() {
    try {
      return await this.permissionRepository.find()
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //🎁 get specific permission details by id
  async findOne(id: number) {
    try {
      let permissionInfo = await this.permissionRepository.findOne({ id })
      if (!permissionInfo) throw new HttpException('Permission Info Not Found', HttpStatus.BAD_REQUEST)
      return permissionInfo
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //🎁 update user permission
  async update(id: number, body: any, user: any) {
    try {

      if (!id) throw new HttpException('Permission Id Not Found', HttpStatus.BAD_REQUEST)
      if (body.title && await this.permissionRepository.findOne({ title: body.title })) throw new HttpException('Duplicate Entry', HttpStatus.BAD_REQUEST)
      // body['createdBy'] = user.id
      let permissionUpdate = await this.permissionRepository.update(id, body)
      if (!permissionUpdate) throw new HttpException("Data Does Not Store", HttpStatus.BAD_REQUEST)
      return permissionUpdate
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜    End   ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ Master admin panel ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜



  //※※※※※※※※※※※※※ Helper functions START ※※※※※※※※※※※※※※


  //※※※※※※※※※※※※※ Helper functions END ※※※※※※※※※※※※※※
}
