import { useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router";
import { GraphBackground } from "./components/GraphBackground";
import { AlgorithmListPage } from "./pages/AlgorithmListPage";
import { AlgorithmDetailPage } from "./pages/AlgorithmDetailPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function AppLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative isolate min-h-screen bg-slate-50">
      <GraphBackground />
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-3">
          <Link
            to="/"
            className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            <img
              src={`${import.meta.env.BASE_URL}brand/algorithm-visuals-logo.png`}
              alt="Algorithm Visuals home"
              className="h-10 w-52 object-cover sm:w-64"
            />
          </Link>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/TazoSepo/algorithm-view"
            className="rounded-sm text-sm font-medium text-blue-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            GitHub Project
          </a>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<AlgorithmListPage />} />
          <Route
            path="algorithms/:algorithmId"
            element={<AlgorithmDetailPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
