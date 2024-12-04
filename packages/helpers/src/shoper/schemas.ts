import { z } from "zod";

export const applicationInstallMessageSchema = z.object({
  action: z.literal("install"),
  shop: z.string().min(1),
  shop_url: z.string(),
  application_code: z.string(),
  application_version: z.string(),
  auth_code: z.string(),
  timestamp: z.string(),
});

export const applicationUninstallMessageSchema = z.object({
  action: z.literal("uninstall"),
  shop: z.string().min(1),
  shop_url: z.string().min(1),
  application_code: z.string(),
  timestamp: z.string(),
});

export const applicationUpgradeMessageSchema = z.object({
  action: z.literal("upgrade"),
  shop: z.string().min(1),
  shop_url: z.string(),
  application_code: z.string(),
  application_version: z.string(),
  timestamp: z.string(),
});

export const applicationInstallationPaymentMessageSchema = z.object({
  action: z.literal("billing_install"),
  shop: z.string().min(1),
  shop_url: z.string(),
  application_code: z.string(),
  timestamp: z.string(),
});

export const applicationSubscriptionPaidMessageSchema = z.object({
  action: z.literal("billing_subscription"),
  shop: z.string().min(1),
  shop_url: z.string(),
  application_code: z.string(),
  subscription_end_time: z.string(),
  timestamp: z.string(),
});
