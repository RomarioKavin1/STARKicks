import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useEffect, useState } from "react";
import ControllerConnector from "@cartridge/connector/controller";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

export function WalletButton() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const controller = connectors[0] as ControllerConnector;
  const [username, setUsername] = useState<string>();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!address) return;
    controller.username()?.then((n) => setUsername(n));
  }, [address, controller]);

  const truncateAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="fixed top-28 right-72  z-50">
      {address ? (
        <div
          className="relative"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          <button className="arcade-btn bg-gray-800 hover:bg-gray-700 font-pixel text-sm flex items-center gap-2 px-4 py-2">
            <Coins className="w-4 h-4" />
            <span>{truncateAddress(address)}</span>
          </button>

          {isExpanded && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl p-4">
              <div className="space-y-3">
                <div className="text-sm text-gray-400 font-pixel">
                  {address && <p>WALLET: {truncateAddress(address)}</p>}
                  {username && (
                    <p className="text-yellow-400">USERNAME: {username}</p>
                  )}
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <Button
                    onClick={() => disconnect()}
                    className="w-full font-pixel bg-yellow-500 hover:bg-yellow-600 text-black text-sm"
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Button
          onClick={() => connect({ connector: controller })}
          className="arcade-btn bg-yellow-500 hover:bg-yellow-600 text-black font-pixel text-sm"
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
}
