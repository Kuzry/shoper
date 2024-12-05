import { Module } from "@nestjs/common";
import { WebhookApiController } from "./webhook-api.controller";
import { WebhookApiService } from "./webhook-api.service";

@Module({
  imports: [],
  controllers: [WebhookApiController],
  providers: [WebhookApiService],
})
export class WebhookApiModule {}
