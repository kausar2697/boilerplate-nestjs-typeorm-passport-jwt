import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { UserPermission } from 'src/modules/user-permission/entities/user-permission.entity';
import { Repository } from 'typeorm';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRole } from './entities/user-role.entity';

@Injectable()
export class UserRoleService {

  constructor(
    @InjectRepository(UserRole, 'quykshop') private readonly roleRepository: Repository<UserRole>,
    @InjectRepository(UserPermission, 'quykshop') private readonly permissionRepository: Repository<UserPermission>,
    private cacheManager: RedisCacheService
  ) { }

  update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    return `This action updates a #${id} userRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRole`;
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


  //🎁 create and update user role
  async create(body, user) {
    try {
      let userRoleInfo = new UserRole
      //👀 for update role
      if (body.id) {
        userRoleInfo.id = body.id
        // userRoleInfo.updatedBy = user.id
      }
      if (!body.title && !body.id) throw new HttpException('Role Title Not Found', HttpStatus.BAD_REQUEST)
      if (body.title && await this.roleRepository.findOne({ title: body.title })) throw new HttpException('Duplicate Entry', HttpStatus.BAD_REQUEST)
      userRoleInfo.title = body.title

      userRoleInfo.status = body.status
      // if (!body.id) userRoleInfo.createdBy = user.id
      let roleStored = this.roleRepository.save(userRoleInfo)
      if (!roleStored) throw new HttpException("Data Does Not Store", HttpStatus.BAD_REQUEST)

      //👀 updating redis role list
      const rolelist = await this.findAll()
      await this.cacheManager.set('user:role_list', rolelist)
      return roleStored
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //🎁 get all role list
  async findAll() {
    try {
      return await this.roleRepository.createQueryBuilder("role")
        .leftJoinAndSelect("role.userPermission", "userPermission")
        .getMany()
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //🎁 get specific role details by id
  async findOne(id: number) {
    try {
      const roleInfo = await this.roleRepository.createQueryBuilder("role")
        .leftJoinAndSelect("role.userPermission", "userPermission")
        .where("role.id =:rid", { rid: id })
        .getOne()
      if (!roleInfo) throw new HttpException('Role Info Not Found', HttpStatus.BAD_REQUEST)
      return roleInfo
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }

  //🎁 associate permissions with specific role
  async associatePermission(body, user) {
    try {
      let permissionArray = []
      let roleinfo = new UserRole()
      if (!body.roleId) throw new HttpException('Role ID Not Found', HttpStatus.BAD_REQUEST)
      roleinfo.id = body.roleId
      if (!body.associatePermissions) throw new HttpException('Permission List Not Found', HttpStatus.BAD_REQUEST)
      body.associatePermissions.forEach(async permission => {
        let permissionInfo = await this.permissionRepository.findOne({ id: permission })
        permissionArray.push(permissionInfo)
      });

      roleinfo.userPermission = permissionArray
      // roleinfo.updatedBy = user.id
      const roleInfoStored = await this.roleRepository.save(roleinfo)
      if (!roleInfoStored) throw new HttpException("Data Does Not Store", HttpStatus.BAD_REQUEST)

      //👀 updating redis role list
      const rolelist = await this.findAll()
      await this.cacheManager.set('user:role_list', rolelist)
      return roleInfoStored
    } catch (err) {
      throw new HttpException(err.response, err.status)
    }
  }
  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜    End   ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜
  //⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜ Master admin panel ⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜



  //※※※※※※※※※※※※※ Helper functions START ※※※※※※※※※※※※※※


  //※※※※※※※※※※※※※ Helper functions END ※※※※※※※※※※※※※※
}
