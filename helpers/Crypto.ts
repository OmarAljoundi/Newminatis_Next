import CryptoJS from "crypto-js";

export const EncryptData = <T>(data: T): string => {
  const jsonString = JSON.stringify(data);
  const encryptedBytes = CryptoJS.TripleDES.encrypt(
    jsonString,
    process.env.NEXT_ORDER_SECRET!
  );
  const encryptedString = encryptedBytes.toString();

  return encryptedString;
};

export const DecryptData = <T>(encryptedData: string): T => {
  const decryptedBytes = CryptoJS.TripleDES.decrypt(
    encryptedData,
    process.env.NEXT_ORDER_SECRET!
  );
  const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
  const parsedObject = JSON.parse(decryptedString) as T;

  return parsedObject;
};
