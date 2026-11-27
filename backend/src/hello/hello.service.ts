import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  getMessage() {
    return { message: 'Hello from NestJS!!!' };
  }
}