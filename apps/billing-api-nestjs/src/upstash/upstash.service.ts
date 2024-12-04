import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { verifyQStashSignature } from "@shoper/helpers/upstash";

@Injectable()
export class UpstashService {
  constructor(private configService: ConfigService) {}

  async verifySignature(body: string, signature: string) {
    return await verifyQStashSignature(
      this.configService.get<string>("SHOPER_APP_STORE_SECRET"),
      this.configService.get<string>("SHOPER_APP_STORE_SECRET"),
      body,
      signature
    );
  }
}
