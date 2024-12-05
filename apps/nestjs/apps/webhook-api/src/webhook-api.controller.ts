import { Controller, Get } from "@nestjs/common";
import { WebhookApiService } from "./webhook-api.service";

@Controller()
export class WebhookApiController {
  constructor(private readonly webhookApiService: WebhookApiService) {}

  @Get()
  getHello(): string {
    return this.webhookApiService.getHello();
  }
}
