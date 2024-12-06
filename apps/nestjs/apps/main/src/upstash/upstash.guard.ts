import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UpstashService } from "./upstash.service";

@Injectable()
export class UpstashGuard implements CanActivate {
  constructor(private readonly upstashService: UpstashService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const body = request.body,
      signature = request.headers["upstash-signature"];

    return this.upstashService.verifySignature(
      new URLSearchParams(Object.entries(body)).toString(),
      signature
    );
  }
}
