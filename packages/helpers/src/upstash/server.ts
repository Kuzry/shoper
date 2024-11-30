import "server-only";
import { Receiver } from "@upstash/qstash";

export const verifyQStashSignature = async (
  body: string,
  signature: string
) => {
  const reciver = new Receiver({
    currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY ?? "",
    nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY ?? "",
  });

  await reciver.verify({
    body: body,
    signature: signature,
  });
};
