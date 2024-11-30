import "server-only";
import { createHmac } from "node:crypto";

export const verifyShoperSignature = (body: string, signature: string) => {
  const hmacHash = createHmac(
    "sha512",
    process.env.SHOPER_APP_STORE_SECRET ?? ""
  )
    .update(body)
    .digest("hex");

  if (signature !== hmacHash) {
    throw new Error("Incorrect Shoper signature");
  }

  return true;
};
