import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { verifyQStashSignature } from "@shoper/helpers/upstash";

@Injectable()
export class UpstashService {
  constructor(private configService: ConfigService) {}

  verifySignature(body: string, signature: string) {
    return verifyQStashSignature(
      this.configService.get("UPSTASH_CURRENT_SIGNING_KEY"),
      this.configService.get("UPSTASH_NEXT_SIGNING_KEY"),
      body,
      signature
    );
  }
}
