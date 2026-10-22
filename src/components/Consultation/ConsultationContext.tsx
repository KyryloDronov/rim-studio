"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { registerOverlayCloseOnNavigate } from "@/lib/navigation-overlays";
import { ConsultationModalForm } from "@/components/Hero/ConsultationModalForm";
import type { ConsultationSourceId } from "@/content/consultation-sources";

type ConsultationContextValue = Readonly<{
  openConsultation: (source: ConsultationSourceId) => void;
  consultationOpen: boolean;
}>;

const ConsultationContext = createContext<ConsultationContextValue | null>(
  null,
);

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<ConsultationSourceId>("home");

  const openConsultation = useCallback((nextSource: ConsultationSourceId) => {
    setSource(nextSource);
    setOpen(true);
  }, []);

  useEffect(() => {
    return registerOverlayCloseOnNavigate(() => setOpen(false));
  }, []);

  const value = useMemo(
    () => ({ openConsultation, consultationOpen: open }),
    [open, openConsultation],
  );

  return (
    <ConsultationContext.Provider value={value}>
      {children}
      <ConsultationModalForm
        open={open}
        onOpenChange={setOpen}
        source={source}
      />
    </ConsultationContext.Provider>
  );
}

export function useConsultation(): ConsultationContextValue {
  const ctx = useContext(ConsultationContext);
  if (!ctx) {
    throw new Error(
      "useConsultation must be used within ConsultationProvider",
    );
  }
  return ctx;
}
