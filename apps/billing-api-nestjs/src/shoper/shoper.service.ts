import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { verifyShoperSignature } from "@shoper/helpers/shoper";

@Injectable()
export class ShoperService {
  constructor(private configService: ConfigService) {}

  verifySignature(body: string, signature: string): boolean {
    return verifyShoperSignature(
      this.configService.get<string>("SHOPER_APP_STORE_SECRET"),
      body,
      signature
    );
  }
}
