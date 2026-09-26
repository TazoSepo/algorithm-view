import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { PreviewStep } from "../types/preview";

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getMotionPreference() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type AlgorithmPreviewProps<Step extends PreviewStep> = {
  steps: readonly Step[];
  renderStep: (step: Step) => ReactNode;
  stepDuration?: number;
  endDuration?: number;
};

export function AlgorithmPreview<Step extends PreviewStep>({
  steps,
  renderStep,
  stepDuration = 1200,
  endDuration = 2400,
}: AlgorithmPreviewProps<Step>) {
  const [stepIndex, setStepIndex] = useState(0);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    () => true,
  );
  const stepCount = steps.length;
  const currentIndex = stepCount > 0 ? stepIndex % stepCount : 0;

  useEffect(() => {
    if (reducedMotion || stepCount < 2) return;
    const timer = window.setTimeout(
      () => setStepIndex((previous) => (previous + 1) % stepCount),
      currentIndex === stepCount - 1 ? endDuration : stepDuration,
    );
    return () => window.clearTimeout(timer);
  }, [reducedMotion, currentIndex, stepCount, stepDuration, endDuration]);

  const step = steps[currentIndex];
  if (!step) return null;

  return (
    <>
      <div className="mb-3">
        <span className="text-xs font-medium text-slate-600">
          {step.phase} · {currentIndex + 1} / {stepCount}
        </span>
      </div>
      {renderStep(step)}
    </>
  );
}
