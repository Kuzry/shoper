import { z } from "zod";
import {
  applicationInstallationPaymentMessageSchema,
  applicationInstallMessageSchema,
  applicationSubscriptionPaidMessageSchema,
  applicationUninstallMessageSchema,
  applicationUpgradeMessageSchema,
} from "./schemas";

export type TApplicationInstallMessage = z.infer<
  typeof applicationInstallMessageSchema
>;

export type TApplicationUninstallMessage = z.infer<
  typeof applicationUninstallMessageSchema
>;

export type TApplicationUpgradeMessage = z.infer<
  typeof applicationUpgradeMessageSchema
>;

export type TApplicationInstallationPaymentMessage = z.infer<
  typeof applicationInstallationPaymentMessageSchema
>;

export type TApplicationSubscriptionPaidMessage = z.infer<
  typeof applicationSubscriptionPaidMessageSchema
>;

export type TAllApplicationMessages =
  | TApplicationInstallMessage
  | TApplicationUninstallMessage
  | TApplicationUpgradeMessage
  | TApplicationInstallationPaymentMessage
  | TApplicationSubscriptionPaidMessage;
