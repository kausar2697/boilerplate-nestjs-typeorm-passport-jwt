import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
import { SettingsModule } from './modules/settings/settings.module';
import { SettingsService } from './modules/settings/settings.service';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserRoleModule } from './modules/user-role/user-role.module';
import { UserRoleService } from './modules/user-role/user-role.service';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { RedisCacheService } from './redis-cache/redis-cache.service';
import { ValidationPipe } from '@nestjs/common';


dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //🎁 exception filter
  app.useGlobalFilters(new AllExceptionsFilter());
  //🎁 Validation
  app.useGlobalPipes(new ValidationPipe());

  //🎁 configure cors
  const corsOptions = {
    // origin: '*',
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // preflightContinue: true,
    // optionsSuccessStatus: 204,
    // credentials: true,
    origin: [
      /^(.*)/,
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders:
      'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for',
  };
  app.enableCors(corsOptions);
  // app.enableCors();

  //🎁 apply body parser limit 
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));


  //🎁 sttings settings table values to radis
  const settingService = app.select(SettingsModule).get(SettingsService);
  settingService.setRedis()

//🎁 sttings role list with its permissions to radis
  const userRoleService = app.select(UserRoleModule).get(UserRoleService);
  const cacheManager = app.select(RedisCacheModule).get(RedisCacheService);
  const rolelist = await userRoleService.findAll()
  await cacheManager.set('user:role_list',rolelist)

  //🎁 initialize Swagger using the SwaggerModule class
  if(process.env['NODE_ENV'] != 'production'){
    const config = new DocumentBuilder()
      .setTitle('Quykshop Api')
      .setDescription('The Quykshop API description')
      .setVersion('1.0')
      .addTag('User')
      .addTag('Term')
      .addTag('Seller')
      // .addTag('Media')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('qsApi', app, document);
  }

  //🎁 configure listenin port
  await app.listen(3300);

}

bootstrap();
