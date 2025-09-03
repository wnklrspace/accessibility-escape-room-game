"use client";

import Content from "@/content";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
} from "react";

type ContentEntry = any;
type ContentMap = Record<number, ContentEntry | undefined>;

interface StepContextValue {
  stepId: number;
  setStepId: React.Dispatch<React.SetStateAction<number>>;
  content: ContentEntry | undefined;
}

export const StepContext = createContext<StepContextValue | undefined>(
  undefined
);

const toInt = (v: string | number): number => {
  const n = typeof v === "number" ? v : Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : 0;
};

const StepProvider: FC<{ stepId: string | number; children: React.ReactNode }> = ({
  stepId,
  children,
}) => {
  const [currentStepId, setCurrentStepId] = useState<number>(() => toInt(stepId));

  useEffect(() => {
    const next = toInt(stepId);
    setCurrentStepId((prev) => (prev !== next ? next : prev));
  }, [stepId]);

  const content = useMemo(() => {
    const map = Content as unknown as ContentMap;
    return map[currentStepId];
  }, [currentStepId]);

  const value = useMemo<StepContextValue>(
    () => ({ stepId: currentStepId, setStepId: setCurrentStepId, content }),
    [currentStepId, content]
  );

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
};

export const useStep = () => {
  const ctx = useContext(StepContext);
  if (!ctx) {
    throw new Error("useStep must be used within a StepProvider");
  }
  return {
    stepId: ctx.stepId,
    setStepId: ctx.setStepId,
    content: ctx.content,
  };
};

export default StepProvider;
