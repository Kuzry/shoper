import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { UpstashService } from "./upstash/upstash.service";
import { UpstashModule } from "./upstash/upstash.module";
import { DbModule } from "./db/db.module";
import { HttpModule } from "@nestjs/axios";
import { ShoperModule } from "@/main/shoper/shoper.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.local"],
    }),
    DbModule,
    ShoperModule,
    UpstashModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [UpstashService],
})
export class AppModule {}
