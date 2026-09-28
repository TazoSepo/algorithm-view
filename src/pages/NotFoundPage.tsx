import { useEffect } from "react";
import { Link } from "react-router";

export function NotFoundPage({ algorithm = false }: { algorithm?: boolean }) {
  useEffect(() => {
    document.title = "Not found - Algorithm Visuals";
  }, []);
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="font-mono text-sm text-blue-700">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-slate-900">
        {algorithm ? "Algorithm not found" : "Page not found"}
      </h1>
      <p className="mt-4 text-slate-600">
        Choose an available algorithm from the catalogue.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white"
      >
        Back to algorithms
      </Link>
    </div>
  );
}
