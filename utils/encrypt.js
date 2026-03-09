import session from './session.js';
import crypto from "crypto";

function encryptPassword(password, iv) {
  const cipher = crypto.createCipheriv(
    "aes256",
    session.key,
    Buffer.from(iv, "hex")
  );

  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
}

export default encryptPassword;