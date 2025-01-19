// lib/DojoContext.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { init, SDK } from "@dojoengine/sdk";
import { SchemaType, schema } from "@/dojo/typescript/models.gen";
import { dojoConfig } from "@/dojo/dojoConfig";
import { BurnerManager } from "@dojoengine/create-burner";
import { Account, AccountInterface } from "starknet";
import { setupWorld } from "@/dojo/typescript/contracts.gen";
import { sepolia } from "@starknet-react/chains";

export interface DojoContextType {
  sdk: SDK<SchemaType> | null;
  isInitialized: boolean;
  error?: string;
  masterAccount?: AccountInterface;
  burnerManager?: BurnerManager;
}

export const DojoContext = createContext<DojoContextType>({
  sdk: null,
  isInitialized: false,
});

const initializeSdk = async () => {
  try {
    return await init<SchemaType>(
      {
        client: {
          rpcUrl: "https://api.cartridge.gg/x/starknet/sepolia",
          toriiUrl: "http://localhost:8080",
          relayUrl: "/ip4/127.0.0.1/tcp/9090",
          worldAddress: dojoConfig.manifest.world.address,
        },
        domain: {
          name: "OnChainDash",
          revision: "1",
          chainId: "1",
          version: "1",
        },
      },
      schema
    );
  } catch (error) {
    console.error("Failed to initialize SDK:", error);
    throw error;
  }
};

export function DojoProvider({ children }: { children: React.ReactNode }) {
  const [sdk, setSdk] = useState<SDK<SchemaType> | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string>();

  // Initialize SDK
  useEffect(() => {
    const init = async () => {
      try {
        const dojoSdk = await initializeSdk();
        setSdk(dojoSdk);
        setIsInitialized(true);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to initialize Dojo"
        );
        setIsInitialized(false);
      }
    };

    init();
  }, []);

  // Create master account if needed
  const masterAccount = useMemo(() => {
    if (!sdk) return undefined;
    // Add your master account logic here if needed
    return undefined;
  }, [sdk]);

  // Create burner manager
  //   const burnerManager = useMemo(() => {
  //     if (!masterAccount || !sdk) return undefined;

  //     return new BurnerManager({
  //       masterAccount: masterAccount,
  //       accountClassHash: dojoConfig.manifest.contracts[0].classHash,
  //       feeTokenAddress: dojoConfig.feeTokenAddress,
  //       rpcProvider:sepolia.rpcProvider,
  //     });
  //   }, [masterAccount, sdk]);

  const contextValue = {
    sdk,
    isInitialized,
    error,
    masterAccount,
    // burnerManager,
  };

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
          <p>Initializing Dojo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-red-500">
          <p>Failed to initialize: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <DojoContext.Provider value={contextValue}>{children}</DojoContext.Provider>
  );
}

export function useDojo() {
  const context = useContext(DojoContext);
  if (context === undefined) {
    throw new Error("useDojo must be used within a DojoProvider");
  }
  return context;
}
