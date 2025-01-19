"use client";
import { PackSelection } from "@/components/game/packSelection";
import React from "react";

export default function PackPage() {
  return (
    <main className="min-h-screen pixel-art-bg text-white flex items-center justify-center p-8">
      <div className="arcade-cabinet">
        <div className="arcade-screen">
          <PackSelection />
        </div>

        {/* Arcade Controls */}
        <div className="arcade-controls">
          <div className="controls-left">
            <div className="joystick" />
          </div>
          <div className="controls-right">
            <div className="arcade-button red" />
            <div className="arcade-button blue" />
          </div>
        </div>
      </div>
    </main>
  );
}
