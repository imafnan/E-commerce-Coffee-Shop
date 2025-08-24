import { cn } from "@/lib/utils";
import React from "react";

export function CoffeeCup({ className }: { className?: string }) {
  return (
    <svg
      className={cn(className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 12H5c0-2.5 1.5-4.5 4-5.5" />
      <path d="M14 12h-4" />
      <path d="M18.37 7.37a1 1 0 0 1-1.42 1.42" />
      <path d="M14.24 3.24a1 1 0 0 1 .12 1.58" />
      <path d="M12.5 17.5a4.5 4.5 0 0 1-5 0" />
      <path d="M19 12h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1" />
      <path d="M5 12v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-5" />
    </svg>
  );
}
