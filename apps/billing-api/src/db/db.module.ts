import { Module } from "@nestjs/common";
import { createDb } from "@shoper/db/db";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: "db",
      useFactory: (configService: ConfigService) => {
        return createDb(configService.get("SUPABASE_URL"));
      },
      inject: [ConfigService],
    },
  ],
  exports: ["db"],
})
export class DbModule {}
