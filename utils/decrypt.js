import session from './session';
import crypto from "crypto";

function decryptPassword(password) {
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    session.key,
    Buffer.from(session.iv, "hex")
  );

  let decrypted = decipher.update(password, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

export default decryptPassword;