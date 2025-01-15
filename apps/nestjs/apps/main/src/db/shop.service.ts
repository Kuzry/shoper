import { Inject, Injectable } from "@nestjs/common";
import { selectShopByShopId } from "@shoper/db/model/shop";
import { TDb } from "@shoper/db/db";

@Injectable()
export class ShopService {
  constructor(
    @Inject("db")
    private readonly db: TDb
  ) {}

  selectByShopId(shopId: string) {
    return selectShopByShopId(this.db, shopId);
  }
}
