"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className="fixed top-28 left-72 z-50 arcade-btn bg-gray-800 hover:bg-gray-700 font-pixel text-sm flex items-center gap-2 px-4 py-2"
    >
      <ArrowLeft className="w-4 h-4" />
      BACK
    </button>
  );
}
