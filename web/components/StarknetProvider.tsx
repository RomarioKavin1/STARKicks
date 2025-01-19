"use client";
import { sepolia, mainnet, Chain } from "@starknet-react/chains";
import {
  StarknetConfig,
  jsonRpcProvider,
  starkscan,
} from "@starknet-react/core";
import ControllerConnector from "@cartridge/connector/controller";
import { SessionPolicies } from "@cartridge/controller";
import { dojoConfig } from "@/dojo/dojoConfig";
import React from "react";
import { DojoProvider } from "@/dojo/dojocontext";

// Define session policies
const policies: SessionPolicies = {
  contracts: {
    [dojoConfig.manifest.contracts[0].address]: {
      methods: [
        {
          name: "create_game",
          entrypoint: "create_game",
          description: "Create a new game",
        },
        {
          name: "spawn",
          entrypoint: "spawn",
          description: "Spawn a new card",
        },
        {
          name: "set_deck",
          entrypoint: "set_deck",
          description: "Set the deck for the player",
        },
      ],
    },
  },
};

const connector = new ControllerConnector({
  policies,
  rpc: "https://api.cartridge.gg/x/starknet/sepolia",
  colorMode: "dark",
});

const provider = jsonRpcProvider({
  rpc: () => ({
    nodeUrl: "https://api.cartridge.gg/x/starknet/sepolia",
  }),
});

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  return (
    <DojoProvider>
      <StarknetConfig
        autoConnect
        chains={[sepolia]}
        provider={provider}
        connectors={[connector]}
        explorer={starkscan}
      >
        {children}
      </StarknetConfig>
    </DojoProvider>
  );
}
