"use client";

import { useEffect, useState } from "react";
import { x25519 } from "@noble/curves/ed25519";
import { xchacha20poly1305 } from "@noble/ciphers/chacha";
import { randomBytes } from "@noble/ciphers/webcrypto";
import { utf8ToBytes, bytesToUtf8 } from "@noble/ciphers/utils";

import { Button } from "@/components/ui/button";

export default function Home() {
  const [decryptedEvent, setDecryptedMessage] = useState<{
    Title: string;
    Location: string;
    Time: string;
  } | null>(null);

  useEffect(() => {
    const priv =
      "a546e36bf0527c9d3b16154b82465edd62144c0ac1fc5a18506a2244ba449ac4";
    console.log("✞✞✞✞✞✞✞", x25519.getPublicKey(priv));

    const key = randomBytes(32); // 32 bytes for 256-bit key
    const nonce = randomBytes(24); // 24 bytes for XChaCha20-Poly1305 nonce

    const event = {
      Title: "Meeting",
      Location: "Office",
      Time: "10:00 AM",
    };

    // Convert JSON object to string and then to UTF-8 bytes
    const eventBytes = utf8ToBytes(JSON.stringify(event));

    // Encrypt the message
    const cipherInstance = xchacha20poly1305(key, nonce);
    const encrypted = cipherInstance.encrypt(eventBytes);
    console.log("Encrypted Event Data:", encrypted);

    // Decrypt the message
    const decrypted = cipherInstance.decrypt(encrypted);
    const decryptedText = bytesToUtf8(decrypted);
    console.log("Decrypted Event Data:", decryptedText);

    // Parse the decrypted text back to JSON object
    const decryptedEvent = JSON.parse(decryptedText);
    setDecryptedMessage(decryptedEvent);
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className="flex items-center justify-center min-h-screen">
        <Button>Click me</Button>
      </div>
      {decryptedEvent && (
        <div>
          <p>
            <strong>Title:</strong> {decryptedEvent.Title}
          </p>
          <p>
            <strong>Location:</strong> {decryptedEvent.Location}
          </p>
          <p>
            <strong>Time:</strong> {decryptedEvent.Time}
          </p>
        </div>
      )}
    </>
  );
}
