import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Welcome to the gym-api 🏋️',
      documentation:
        "Visit the http://localhost:3000/documentation to check the full project's documentation",
    };
  }
}
