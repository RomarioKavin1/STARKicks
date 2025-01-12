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

  // Helper function to truncate address for display
  const truncateAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6 space-y-4">
        {address && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Account: {truncateAddress(address)}
            </p>
            {username && (
              <p className="text-sm font-medium">Username: {username}</p>
            )}
          </div>
        )}

        {address ? (
          <Button
            variant="destructive"
            onClick={() => disconnect()}
            className="w-full"
          >
            Disconnect
          </Button>
        ) : (
          <Button
            onClick={() => connect({ connector: controller })}
            className="w-full"
          >
            Connect
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default ConnectWallet;
