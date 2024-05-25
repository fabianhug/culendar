"use client";

import { useEffect, useState } from "react";
import { x25519 } from "@noble/curves/ed25519";
import { xchacha20poly1305 } from "@noble/ciphers/chacha";
import { randomBytes } from "@noble/ciphers/webcrypto";
import { utf8ToBytes, bytesToUtf8 } from "@noble/ciphers/utils";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import WalletConnectButton from "@/components/ui/walletConnectButton";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

export default function Home() {
  const [decryptedEvent, setDecryptedMessage] = useState<{
    Title: string;
    Location: string;
    Time: string;
  } | null>(null);

  const { address, chainId, isConnected } = useWeb3ModalAccount();

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
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Manage Events</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New Event</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Edit Event</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>List Event</MenubarItem>
          </MenubarContent>
          <WalletConnectButton />
        </MenubarMenu>
      </Menubar>

      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className="flex items-center justify-center">
        <p className="text-lg font-semibold">Wallet Address: {address}</p>
        <p className="text-lg font-semibold">Chain ID: {chainId}</p>
        <p className="text-lg font-semibold">
          Connection Status: {isConnected ? "Connected" : "Disconnected"}
        </p>
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
