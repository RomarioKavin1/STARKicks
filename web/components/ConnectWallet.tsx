// components/ConnectWallet.tsx
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useEffect, useState } from "react";
import ControllerConnector from "@cartridge/connector/controller";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ConnectWallet() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const controller = connectors[0] as ControllerConnector;
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    if (!address) return;
    controller.username()?.then((n) => setUsername(n));
  }, [address, controller]);

  const truncateAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <Card className="arcade-card w-full">
      <CardContent className="p-6 space-y-4">
        {address && (
          <div className="space-y-2">
            <p className="text-sm text-gray-400 font-pixel">
              WALLET: {truncateAddress(address)}
            </p>
            {username && (
              <p className="text-sm font-pixel text-yellow-400">
                USERNAME: {username}
              </p>
            )}
          </div>
        )}

        <Button
          onClick={() =>
            address ? disconnect() : connect({ connector: controller })
          }
          className="w-full font-pixel bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          {address ? "Disconnect Wallet" : "Connect Wallet"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default ConnectWallet;
