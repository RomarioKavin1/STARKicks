// app/test/page.tsx
"use client";

import { useAccount, useExplorer } from "@starknet-react/core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { toast } from "@/hooks/use-toast";

const WORLD_ADDRESS =
  "0x00718cf01e9cb909a75e71057b001839a3fa300faf6127bb6e78345d9e8b872d";

export default function TestPage() {
  const { account } = useAccount();
  const explorer = useExplorer();
  const [gameId, setGameId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [txHash, setTxHash] = useState<string>();

  const executeSpawn = useCallback(async () => {
    if (!account) return;
    setSubmitted(true);
    setTxHash(undefined);
    try {
      const result = await account.execute([
        {
          contractAddress: WORLD_ADDRESS,
          entrypoint: "spawn",
          calldata: [],
        },
      ]);
      setTxHash(result.transaction_hash);
      toast({
        title: "Success",
        description: "Card spawned successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to spawn card",
        variant: "destructive",
      });
    } finally {
      setSubmitted(false);
    }
  }, [account]);

  const executeCreateGame = useCallback(async () => {
    if (!account) return;
    const newGameId = Math.floor(Date.now() / 1000);
    setSubmitted(true);
    setTxHash(undefined);
    try {
      const result = await account.execute([
        {
          contractAddress: WORLD_ADDRESS,
          entrypoint: "create_game",
          calldata: [newGameId],
        },
      ]);
      setTxHash(result.transaction_hash);
      setGameId(newGameId.toString());
      toast({
        title: "Success",
        description: "Game created successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create game",
        variant: "destructive",
      });
    } finally {
      setSubmitted(false);
    }
  }, [account]);

  const executeSetDeck = useCallback(async () => {
    if (!account) return;
    const cardIds = [1213, 1214, 1215, 1216, 1217];
    setSubmitted(true);
    setTxHash(undefined);
    try {
      const result = await account.execute([
        {
          contractAddress: WORLD_ADDRESS,
          entrypoint: "set_deck",
          calldata: [cardIds.length, ...cardIds],
        },
      ]);
      setTxHash(result.transaction_hash);
      toast({
        title: "Success",
        description: "Deck set successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to set deck",
        variant: "destructive",
      });
    } finally {
      setSubmitted(false);
    }
  }, [account]);

  const executePlayCard = useCallback(
    async (isSpecial: boolean) => {
      if (!account || !gameId) return;
      setSubmitted(true);
      setTxHash(undefined);
      try {
        const result = await account.execute([
          {
            contractAddress: WORLD_ADDRESS,
            entrypoint: "play_card",
            calldata: [gameId, 1213, isSpecial ? 1 : 0],
          },
        ]);
        setTxHash(result.transaction_hash);
        toast({
          title: "Success",
          description: `Card played ${
            isSpecial ? "with" : "without"
          } special ability`,
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to play card",
          variant: "destructive",
        });
      } finally {
        setSubmitted(false);
      }
    },
    [account, gameId]
  );

  const executeEndTurn = useCallback(async () => {
    if (!account || !gameId) return;
    setSubmitted(true);
    setTxHash(undefined);
    try {
      const result = await account.execute([
        {
          contractAddress: WORLD_ADDRESS,
          entrypoint: "end_turn",
          calldata: [gameId],
        },
      ]);
      setTxHash(result.transaction_hash);
      toast({
        title: "Success",
        description: "Turn ended successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to end turn",
        variant: "destructive",
      });
    } finally {
      setSubmitted(false);
    }
  }, [account, gameId]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Game Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={executeSpawn}
              disabled={submitted}
              className="w-full"
            >
              Spawn Card
            </Button>

            <Button
              onClick={executeCreateGame}
              disabled={submitted}
              className="w-full"
            >
              Create Game
            </Button>

            <Button
              onClick={executeSetDeck}
              disabled={submitted || !gameId}
              className="w-full"
            >
              Set Deck
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Game State</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>Game ID: {gameId || "No game created"}</p>
              {txHash && (
                <p>
                  Latest Transaction:{" "}
                  <a
                    href={explorer.transaction(txHash)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {txHash.slice(0, 10)}...
                  </a>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Game Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => executePlayCard(false)}
                disabled={submitted || !gameId}
              >
                Play Normal Card
              </Button>

              <Button
                onClick={() => executePlayCard(true)}
                disabled={submitted || !gameId}
                variant="secondary"
              >
                Play Special Card
              </Button>

              <Button
                onClick={executeEndTurn}
                disabled={submitted || !gameId}
                variant="outline"
                className="col-span-2"
              >
                End Turn
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
