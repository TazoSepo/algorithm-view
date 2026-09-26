import "./App.css";
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-4xl font-bold text-blue-950">Algorithm Lab</h1>

      <p className="mt-4 text-slate-600">
        Explore algorithms, one step at a time.
      </p>

      <Button className="mt-6">Start Exploring</Button>
    </main>
  );
}
