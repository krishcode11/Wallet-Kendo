'use client';

import CryptoJS from 'crypto-js';
import 'crypto-js/lib-typedarrays';

// Use type from CryptoJS namespace
type WordArray = CryptoJS.lib.WordArray;

const ITERATIONS = 10000;
const KEY_LENGTH = 32;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;

export async function encrypt(data: string, password: string): Promise<string> {
  // Generate random salt and IV
  const salt = CryptoJS.lib.WordArray.random(SALT_LENGTH);
  const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);

  // Derive key using PBKDF2
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: KEY_LENGTH / 4,
    iterations: ITERATIONS
  });

  // Encrypt the data
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC, // Using CBC mode as GCM is not available
    padding: CryptoJS.pad.Pkcs7
  });

  // Combine salt, IV, and encrypted data
  const saltHex = salt.toString();
  const ivHex = iv.toString();
  const encryptedHex = encrypted.toString();
  const combined = saltHex + ivHex + encryptedHex;

  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(combined));
}

export async function decrypt(encryptedData: string, password: string): Promise<string> {
  // Decode the combined data
  const combined = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encryptedData));
  
  // Extract components
  const saltHex = combined.slice(0, SALT_LENGTH * 2);
  const ivHex = combined.slice(SALT_LENGTH * 2, (SALT_LENGTH + IV_LENGTH) * 2);
  const encryptedHex = combined.slice((SALT_LENGTH + IV_LENGTH) * 2);

  // Convert hex strings back to WordArrays
  const salt = CryptoJS.enc.Hex.parse(saltHex);
  const iv = CryptoJS.enc.Hex.parse(ivHex);

  // Derive key using PBKDF2
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: KEY_LENGTH / 4,
    iterations: ITERATIONS
  });

  // Decrypt the data
  const decrypted = CryptoJS.AES.decrypt(encryptedHex, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC, // Using CBC mode as GCM is not available
    padding: CryptoJS.pad.Pkcs7
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
} 