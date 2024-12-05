import { Controller, Post, UseGuards } from "@nestjs/common";
import { UpstashGuard } from "./upstash/upstash.guard";
import { ShoperGuard } from "./shoper/shoper.guard";

@Controller()
export class AppController {
  @Post()
  @UseGuards(UpstashGuard, ShoperGuard)
  getHello(): string {
    return "Hello You!";
  }
}
