import { NestFactory } from "@nestjs/core";
import { WebhookApiModule } from "./webhook-api.module";

async function bootstrap() {
  const app = await NestFactory.create(WebhookApiModule);
  await app.listen(process.env.port ?? 3000);
}

void bootstrap();
