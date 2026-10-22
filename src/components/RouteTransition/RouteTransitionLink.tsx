"use client";

import { useCallback, type MouseEvent, type ReactNode } from "react";
import { useRouteTransition } from "@/components/RouteTransition";
import { isModifiedClick } from "@/lib/route-transition";

type RouteTransitionLinkProps = Readonly<{
  href: string;
  className?: string;
  children: ReactNode;
  /** Close modal / sheet before the animated route change. */
  onBeforeNavigate?: () => void;
}>;

export function RouteTransitionLink({
  href,
  className,
  children,
  onBeforeNavigate,
}: RouteTransitionLinkProps) {
  const { navigate } = useRouteTransition();

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (isModifiedClick(event.nativeEvent)) return;
      event.preventDefault();
      onBeforeNavigate?.();
      navigate(href, { x: event.clientX, y: event.clientY });
    },
    [href, navigate, onBeforeNavigate],
  );

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
