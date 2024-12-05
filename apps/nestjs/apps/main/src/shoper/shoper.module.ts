import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ShoperService } from "./shoper.service";

@Module({
  providers: [ShoperService],
  imports: [ConfigModule],
  exports: [ShoperService],
})
export class ShoperModule {}
