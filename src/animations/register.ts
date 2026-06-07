/**
 * Single GSAP plugin registration for the client bundle.
 * Safe to import from multiple modules — `registerPlugin` is idempotent.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (globalThis.window !== undefined) {
  gsap.registerPlugin(ScrollTrigger);
}

export {};
