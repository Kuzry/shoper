import { createHmac } from "node:crypto";

export const verifyShoperSignature = (
  appStoreSecret: string,
  body: string,
  signature: string
) => {
  const hmacHash = createHmac("sha512", appStoreSecret)
    .update(body)
    .digest("hex");

  if (signature !== hmacHash) {
    throw new Error("Incorrect Shoper signature");
  }

  return true;
};
