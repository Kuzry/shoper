import hmacSHA512 from "crypto-js/hmac-sha512";
import Hex from "crypto-js/enc-hex";

export const verifyShoperSignature = (
  appStoreSecret: string,
  body: string,
  signature: string
) => {
  const hmacHash = Hex.stringify(hmacSHA512(body, appStoreSecret));

  if (signature !== hmacHash) {
    throw new Error("Incorrect Shoper billing signature");
  }

  return true;
};
