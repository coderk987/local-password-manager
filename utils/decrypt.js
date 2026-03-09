import session from './session.js';
import crypto from "crypto";

function decryptPassword(password, iv) {
  const decipher = crypto.createDecipheriv(
    "aes256",
    session.key,
    Buffer.from(iv, "hex")
  );

  let decrypted = decipher.update(password, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

export default decryptPassword;