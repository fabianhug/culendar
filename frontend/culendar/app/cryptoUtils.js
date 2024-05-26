import { x25519 } from "@noble/curves/ed25519";
import { xchacha20poly1305 } from "@noble/ciphers/chacha";
import { randomBytes } from "@noble/ciphers/webcrypto";
import { utf8ToBytes, bytesToUtf8 } from "@noble/ciphers/utils";

// export type Keypair = { secretKey: Uint8Array };
// export type Recipient = Uint8Array;
// export type Plaintext = string;

export function generateKeyPair() {
  const seed  = randomBytes(32)
  const priv = new Uint8Array(
    seed
  );
  const pub = x25519.getPublicKey(priv);
  return { priv, pub };
}

export function encryptFor(
  keypair,//: Keypair,
  recipient,//: Recipient,
  plaintext,//: Plaintext
) {
  const sharedSecret = x25519.getSharedSecret(keypair.secretKey, recipient);
  const key = sharedSecret.slice(0, 32); // Use the first 32 bytes of the shared secret as the key
  const nonce = randomBytes(24); // xchacha20poly1305 requires a 24-byte nonce

  const chacha = xchacha20poly1305(key, nonce);
  const data = utf8ToBytes(plaintext);
  const ciphertext = chacha.encrypt(data);
  return ciphertext;
}
