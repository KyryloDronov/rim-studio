"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useTransition,
} from "react";
import { dictionaries } from "./dictionaries";
import { localizedPath } from "./paths";
import type { Dictionary, Locale } from "./types";

type LocaleContextValue = Readonly<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isSwitching: boolean;
  t: Dictionary;
}>;

const LocaleContext = createContext<LocaleContextValue | null>(null);

type LocaleProviderProps = Readonly<{
  locale: Locale;
  children: React.ReactNode;
}>;

export function LocaleProvider({ locale, children }: LocaleProviderProps) {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const [isSwitching, startTransition] = useTransition();

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      const target = localizedPath(next, pathname);
      startTransition(() => {
        router.push(target);
      });
    },
    [locale, pathname, router],
  );

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      isSwitching,
      t: dictionaries[locale],
    }),
    [locale, setLocale, isSwitching],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used inside <LocaleProvider>");
  }
  return ctx;
}
