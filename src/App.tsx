import "./App.css";
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="flex mx-auto max-w-5xl items-center justify-between px-6 py-5">
          <h1 className="text-4xl font-bold text-blue-950">
            Algorithm Visuals
          </h1>
          <a
            target="_blank"
            href="https://github.com/TazoSepo/algorithm-view"
            className="text-blue-600 visited:text-purple-600 ..."
          >
            GitHub Project
          </a>
        </div>
      </header>
      <main className="bg-slate-50 py-12">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mt-4 text-slate-600">
            Explore algorithms, one step at a time.
          </p>

          <Button className="mt-6">Start Exploring</Button>
        </div>
      </main>
    </div>
  );
}
