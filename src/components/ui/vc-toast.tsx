"use client";
import { useEffect } from "react";

export function VCToast({ message, onClose, type = "success" }: { message: string; onClose: () => void; type?: "success" | "error" }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2400);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div
      className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg transition-all animate-fade-in-up font-semibold text-base
        ${type === "success" ? "bg-pink-700/90 text-white border border-pink-400" : "bg-red-900/90 text-red-100 border border-red-400"}
      `}
      style={{ minWidth: 220 }}
    >
      {message}
    </div>
  );
}
