import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WalletConnectButton from "@/components/ui/walletConnectButton";

export function WalletConnectModal() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Please connect your wallet to continue.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <WalletConnectButton />
      </CardFooter>
    </Card>
  );
}
