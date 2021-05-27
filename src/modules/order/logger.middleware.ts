import { Injectable, NestMiddleware } from '@nestjs/common';

import { Controller, Response, Post, Body, Get, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common'
import jwt_decode from "jwt-decode";
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private cacheManager: RedisCacheService
  ) { }
  async use(@Request() req, @Response() res, next: any) {
    const header = req.headers.authorization
    const head_split = header.substr(7, header.length - 7)
    const decoded = jwt_decode(head_split);
    const rolelist = await this.cacheManager.get('user_role_list')
    const matchedRole = rolelist.find((element) => {
      return element.title = decoded['role']
    })
    req['permissionList'] = matchedRole.userPermission
    next();
  }
}