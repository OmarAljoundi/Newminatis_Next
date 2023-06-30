import CryptoJS from "crypto-js";

export const EncryptData = <T>(data: T): string => {
  const jsonString = JSON.stringify(data);
  const encJson = CryptoJS.AES.encrypt(
    jsonString,
    process.env.NEXT_PUBLIC_ORDER_SECRET!
  ).toString();
  const encData = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(encJson)
  );
  return encData;
};

export const DecryptData = <T>(encryptedData: string): T | null => {
  try {
    const decData = CryptoJS.enc.Base64.parse(encryptedData).toString(
      CryptoJS.enc.Utf8
    );
    const bytes = CryptoJS.AES.decrypt(
      decData,
      process.env.NEXT_PUBLIC_ORDER_SECRET!
    ).toString(CryptoJS.enc.Utf8);
    return JSON.parse(bytes) as T;
  } catch (ex) {
    return null;
  }
};
