import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Welcome to the gym-api 🏋️',
      documentation:
        "Visit the /documentation to check the full project's documentation",
    };
  }
}
