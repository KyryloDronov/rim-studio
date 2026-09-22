import { renderToStaticMarkup } from "react-dom/server";
import { LogoSmall } from "@/icons/logo_small";

import styles from "./style.module.css";

export function StudioMapMarkerPin() {
  return (
    <div className={styles.markerPin}>
      <span className={styles.markerLogoWrap}>
        <LogoSmall className={styles.markerLogo} />
      </span>
      <span className={styles.markerStem} />
    </div>
  );
}

export function createStudioMapMarkerElement(): HTMLElement {
  const shell = document.createElement("div");
  shell.innerHTML = renderToStaticMarkup(<StudioMapMarkerPin />);
  const pin = shell.firstElementChild;
  if (!(pin instanceof HTMLElement)) {
    throw new Error("StudioMap: failed to build marker element");
  }
  return pin;
}
