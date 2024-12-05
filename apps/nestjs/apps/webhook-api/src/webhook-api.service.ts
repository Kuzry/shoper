import { Injectable } from "@nestjs/common";

@Injectable()
export class WebhookApiService {
  getHello(): string {
    return "Hello World!";
  }
}
