import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { ShoperService } from "./shoper.service";

@Injectable()
export class ShoperBillingApiSignatureGuard implements CanActivate {
  constructor(private readonly shoperService: ShoperService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const newBodyArray: string[] = [];

    Object.keys(request.body).forEach(
      (key) =>
        key !== "hash" && newBodyArray.push(`${key}=${request.body[key]}`)
    );

    return this.shoperService.verifySignature(
      newBodyArray.join("&"),
      request.body["hash"]
    );
  }
}
