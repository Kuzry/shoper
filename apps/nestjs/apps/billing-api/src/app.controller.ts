import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { TAllApplicationMessages } from "@shoper/helpers/shoper/types";
import * as schema from "@shoper/db/schema";
import { type PostgresJsDatabase } from "drizzle-orm/postgres-js/driver";
import { HttpService } from "@nestjs/axios";
import { UpstashGuard } from "@/main/upstash/upstash.guard";
import { eq } from "drizzle-orm";
import { ShoperBillingApiSignatureGuard } from "@/main/shoper/shoper-billing-api-signature.guard";
import { ShoperControlPanelSignatureGuard } from "@/main/shoper/shoper-control-panel-signature.guard";

@Controller()
export class AppController {
  constructor(
    @Inject("db")
    private readonly db: PostgresJsDatabase<typeof schema>,
    private readonly httpService: HttpService
  ) {}

  @Post("/verify-shop-access")
  @UseGuards(ShoperControlPanelSignatureGuard)
  async verifyShopAccess(@Body() body) {
    const accessToken = await this.db
      .select()
      .from(schema.accessTokens)
      .where(eq(schema.accessTokens.shop_id, body.shop));

    const timeLeft = new Date(accessToken[0].expires_at).getTime() - Date.now();
    if (timeLeft < 86400000) {
      const shop = await this.db
        .select()
        .from(schema.shops)
        .where(eq(schema.shops.id, accessToken[0].shop_id));

      const shoperTokenResponse = await this.httpService.axiosRef.post<{
        access_token: string;
        refresh_token: string;
        expires_in: number;
      }>(
        `${shop[0].url}/webapi/rest/oauth/token`,
        {
          refresh_token: accessToken[0].refresh_token,
          grant_type: "refresh_token",
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${process.env.SHOPER_APP_ID}:${process.env.SHOPER_APP_SECRET}`).toString("base64")}`,
            "Accept-Language": "pl_PL;q=0.8",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const expirationDate = new Date();
      expirationDate.setSeconds(
        expirationDate.getSeconds() + shoperTokenResponse.data.expires_in
      );

      const accessTokenRow = {
        shop_id: body.shop,
        access_token: shoperTokenResponse.data.access_token,
        refresh_token: shoperTokenResponse.data.refresh_token,
        expires_at: expirationDate,
      };

      await this.db
        .insert(schema.accessTokens)
        .values(accessTokenRow)
        .onConflictDoUpdate({
          target: schema.accessTokens.shop_id,
          set: accessTokenRow,
        });
    }

    return {
      success: true,
    };
  }

  @Post()
  @UseGuards(UpstashGuard, ShoperBillingApiSignatureGuard)
  async getHello(@Body() body: TAllApplicationMessages) {
    if (body.action === "install") {
      const shopRow = {
        id: body.shop,
        url: body.shop_url,
        app_version: body.application_version,
        app_installed: true,
        auth_code: body.auth_code,
      };

      await this.db.insert(schema.shops).values(shopRow).onConflictDoUpdate({
        target: schema.shops.id,
        set: shopRow,
      });

      const shoperTokenResponse = await this.httpService.axiosRef.post<{
        access_token: string;
        refresh_token: string;
        expires_in: number;
      }>(
        `${body.shop_url}/webapi/rest/oauth/token`,
        {
          code: shopRow.auth_code,
          grant_type: "authorization_code",
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${process.env.SHOPER_APP_ID}:${process.env.SHOPER_APP_SECRET}`).toString("base64")}`,
            "Accept-Language": "pl_PL;q=0.8",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const expirationDate = new Date();
      expirationDate.setSeconds(
        expirationDate.getSeconds() + shoperTokenResponse.data.expires_in
      );

      const accessTokenRow = {
        shop_id: body.shop,
        access_token: shoperTokenResponse.data.access_token,
        refresh_token: shoperTokenResponse.data.refresh_token,
        expires_at: expirationDate,
      };

      await this.db
        .insert(schema.accessTokens)
        .values(accessTokenRow)
        .onConflictDoUpdate({
          target: schema.accessTokens.shop_id,
          set: accessTokenRow,
        });

      return {};
    } else if (body.action === "uninstall") {
      await this.db
        .update(schema.shops)
        .set({
          app_installed: false,
        })
        .where(eq(schema.shops.id, body.shop));

      return {};
    } else if (body.action === "upgrade") {
      await this.db
        .update(schema.shops)
        .set({
          app_version: body.application_version,
        })
        .where(eq(schema.shops.id, body.shop));
    }

    throw new Error("Incorrect action: " + body.action);
  }
}
