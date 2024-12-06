import { Controller, Post } from "@nestjs/common";
import { WebhookApiService } from "./webhook-api.service";

@Controller()
export class WebhookApiController {
  constructor(private readonly webhookApiService: WebhookApiService) {}

  @Post()
  getHello(): string {
    return this.webhookApiService.getHello();
  }
}
