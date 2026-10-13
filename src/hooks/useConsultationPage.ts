"use client";

import { usePathname } from "next/navigation";
import {
  resolveConsultationPageFromPath,
  type ConsultationPageId,
} from "@/lib/consultation-lead-meta";

export function useConsultationPage(): ConsultationPageId {
  const pathname = usePathname();
  return resolveConsultationPageFromPath(pathname ?? "/");
}
