import session from './session';
import crypto from "crypto";

function encryptPassword(password) {
  const cipher = crypto.createCipheriv(
    "aes-256-gcm",
    session.key,
    session.iv
  );

  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");

  const tag = cipher.getAuthTag();

  return {
    encrypted,
    iv: iv.toString("hex"),
    tag: tag.toString("hex")
  };
}

export default encryptPassword;