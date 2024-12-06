import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { UpstashService } from "@/main/upstash/upstash.service";
import { UpstashModule } from "@/main/upstash/upstash.module";
import { DbModule } from "@/main/db/db.module";
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
