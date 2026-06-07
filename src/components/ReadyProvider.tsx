"use client";

import { createContext, useContext, useMemo } from "react";

/**
 * Two-phase readiness for the site shell. The preloader emits these
 * signals at different points in its timeline so consumers can split
 * "the page can paint now" from "you can run your intro animations
 * now" without trying to time them off magic constants.
 *
 *   contentVisible  → ~80 % through the mask reveal. The wrapper is
 *                     `visibility: visible`, background videos kick
 *                     off, the user can see the page fading in
 *                     under the still-dissolving mask.
 *   introReady      → 100 % through the mask reveal. The mask is
 *                     gone — components can run their entrance
 *                     animations without competing with the wipe.
 */
type ReadyValue = Readonly<{
  contentVisible: boolean;
  introReady: boolean;
}>;

const ReadyContext = createContext<ReadyValue>({
  contentVisible: false,
  introReady: false,
});

type ReadyProviderProps = Readonly<{
  contentVisible: boolean;
  introReady: boolean;
  children: React.ReactNode;
}>;

export function ReadyProvider({
  contentVisible,
  introReady,
  children,
}: ReadyProviderProps) {
  /* Memoised so children don't re-render every parent tick — only
     when one of the booleans actually flips. */
  const value = useMemo<ReadyValue>(
    () => ({ contentVisible, introReady }),
    [contentVisible, introReady],
  );
  return (
    <ReadyContext.Provider value={value}>{children}</ReadyContext.Provider>
  );
}

export function useReady(): ReadyValue {
  return useContext(ReadyContext);
}
