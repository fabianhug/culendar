"use client";

import { useEffect, useState } from "react";
import { x25519 } from "@noble/curves/ed25519";
import { xchacha20poly1305 } from "@noble/ciphers/chacha";
import { randomBytes } from "@noble/ciphers/webcrypto";
import { utf8ToBytes, bytesToUtf8 } from "@noble/ciphers/utils";
import { WalletConnectModal } from "@/components/walletConnectModal";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import WalletConnectButton from "@/components/ui/walletConnectButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
// dashboard implementation
import Link from "next/link";
import {
  Bell,
  Ticket,
  Menu,
  Package,
  Package2,
  CalendarFold,
  CalendarCheck2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="">Culendar</span>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Ticket className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <CalendarFold className="h-4 w-4" />
                  Events
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    1
                  </Badge>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                >
                  <Package className="h-4 w-4" />
                  Products{" "}
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <CalendarCheck2 className="h-6 w-6" />
                    <span className="sr-only">Culendar</span>
                  </Link>
                  <Link
                    href="#"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Ticket className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="#"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                  >
                    <CalendarFold className="h-5 w-5" />
                    Events
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      6
                    </Badge>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <h1 className="text-lg font-semibold md:text-2xl">Events</h1>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {/* Logged In */}
            {isConnected ? (
              // Connected, show wallet address and chain ID
              <div
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
                x-chunk="dashboard-02-chunk-1"
              >
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    You have no events
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Please either create or join an event
                  </p>
                  <Button className="mt-4">Add Event</Button>
                  <WalletConnectButton />
                </div>
              </div>
            ) : (
              // Not connected, show wallet connect modal
              <WalletConnectModal />
            )}

            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-4">
                <CarouselItem className="pl-2 md:pl-4">
                  <div>
                    {/* show decrypted data */}
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
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-2 md:pl-4">
                  <div>
                    {/* show decrypted data */}
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
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </main>
        </div>
      </div>
    </>
  );
}
