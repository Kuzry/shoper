import { Receiver } from "@upstash/qstash";

export const verifyQStashSignature = async (
  currentSigningKey: string,
  nextSigningKey: string,
  body: string,
  signature: string
) => {
  const reciver = new Receiver({
    currentSigningKey,
    nextSigningKey,
  });

  return await reciver.verify({
    body: body,
    signature: signature,
  });
};
