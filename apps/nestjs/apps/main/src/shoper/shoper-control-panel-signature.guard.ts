import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { ShoperService } from "@/main/shoper/shoper.service";

@Injectable()
export class ShoperControlPanelSignatureGuard implements CanActivate {
  constructor(private readonly shoperService: ShoperService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.shoperService.verifySignature(
      new URLSearchParams({
        "admin-id": request.body["admin-id"],
        "admin-name": request.body["admin-name"],
        place: request.body.place,
        shop: request.body.shop,
        timestamp: request.body.timestamp,
      }).toString(),
      request.body["admin-hash"]
    );
  }
}
