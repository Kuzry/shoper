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

  try {
    await reciver.verify({
      body: body,
      signature: signature,
    });
  } catch {
    return false;
  }

  return true;
};
