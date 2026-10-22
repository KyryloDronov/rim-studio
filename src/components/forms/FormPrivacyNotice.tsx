"use client";

import { RouteTransitionLink } from "@/components/RouteTransition/RouteTransitionLink";

type FormPrivacyNoticeProps = Readonly<{
  before: string;
  linkHref: string;
  linkLabel: string;
  after: string;
  className?: string;
  linkClassName?: string;
  onBeforeNavigate?: () => void;
}>;

export function FormPrivacyNotice({
  before,
  linkHref,
  linkLabel,
  after,
  className,
  linkClassName,
  onBeforeNavigate,
}: FormPrivacyNoticeProps) {
  return (
    <p className={className}>
      {before}
      <RouteTransitionLink
        href={linkHref}
        className={linkClassName}
        onBeforeNavigate={onBeforeNavigate}
      >
        {linkLabel}
      </RouteTransitionLink>
      {after}
    </p>
  );
}
