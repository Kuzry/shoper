import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { ShoperService } from "./shoper.service";

@Injectable()
export class ShoperGuard implements CanActivate {
  constructor(private readonly shoperService: ShoperService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest(),
      body = request.body,
      signature = body["hash"];

    const newBodyArray: string[] = [];

    Object.keys(body).forEach(
      (key) => key !== "hash" && newBodyArray.push(`${key}=${body[key]}`)
    );

    return this.shoperService.verifySignature(
      newBodyArray.join("&"),
      signature
    );
  }
}
