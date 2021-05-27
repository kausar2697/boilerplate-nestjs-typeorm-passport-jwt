import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
  } from '@nestjs/common';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
	  const ctx = host.switchToHttp();
	  const response = ctx.getResponse();
	  const request = ctx.getRequest();

	  const errorMsg = exception instanceof HttpException  ? exception.getResponse(): 'Internal server error!';
	  const status =exception instanceof HttpException? exception.getStatus(): HttpStatus.INTERNAL_SERVER_ERROR;
	  
	  const message = typeof errorMsg === 'object' && errorMsg !== null && errorMsg.hasOwnProperty('message') ? errorMsg['message'] :  errorMsg ;
	  const errorObject={
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			message: message 
		}	

		console.log('error exception filter===',errorObject);
		
	  response.status(status).json(errorObject);
	}
  }
