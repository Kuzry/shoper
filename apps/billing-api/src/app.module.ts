import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ShoperModule } from "./shoper/shoper.module";
import { ConfigModule } from "@nestjs/config";
import { UpstashService } from "./upstash/upstash.service";
import { UpstashModule } from "./upstash/upstash.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.local"],
    }),
    ShoperModule,
    UpstashModule,
  ],
  controllers: [AppController],
  providers: [UpstashService],
})
export class AppModule {}
