"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ContactSheetContextValue = Readonly<{
  open: boolean;
  openSheet: () => void;
  closeSheet: () => void;
  toggleSheet: () => void;
}>;

const ContactSheetContext = createContext<ContactSheetContextValue | null>(
  null,
);

export function ContactSheetProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openSheet = useCallback(() => setOpen(true), []);
  const closeSheet = useCallback(() => setOpen(false), []);
  const toggleSheet = useCallback(() => setOpen((prev) => !prev), []);

  const value = useMemo(
    () => ({ open, openSheet, closeSheet, toggleSheet }),
    [open, openSheet, closeSheet, toggleSheet],
  );

  return (
    <ContactSheetContext.Provider value={value}>
      {children}
    </ContactSheetContext.Provider>
  );
}

export function useContactSheet(): ContactSheetContextValue {
  const ctx = useContext(ContactSheetContext);
  if (!ctx) {
    throw new Error("useContactSheet must be used within ContactSheetProvider");
  }
  return ctx;
}
