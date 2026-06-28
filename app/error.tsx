"use client";

import { useEffect } from "react";
import Button from "@/components/Button";

/**
 * Error Boundary global pour l'application
 * Capte toutes les erreurs non gérées et affiche un message convivial
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log l'erreur en développement
    if (process.env.NODE_ENV === "development") {
      console.error("Error boundary caught:", error);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Oups ! Une erreur est survenue
          </h2>
          <p className="text-gray-600">
            Nous nous excusons pour la gêne occasionnée.
          </p>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-sm font-mono text-red-800 break-words">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Button
            text="Réessayer"
            onClick={reset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
          />
          <Button
            text="Retour à l'accueil"
            onClick={() => (window.location.href = "/")}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
