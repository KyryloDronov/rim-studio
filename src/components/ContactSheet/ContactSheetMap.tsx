"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LogoSmall } from "@/icons/logo_small";
import {
  getMapboxAccessToken,
  STUDIO_COORDINATES,
} from "@/content/studio-location";

import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./style.module.css";

type ContactSheetMapProps = Readonly<{
  active: boolean;
  ariaLabel: string;
}>;

function MarkerPin() {
  return (
    <div className={styles.markerPin}>
      <span className={styles.markerLogoWrap}>
        <LogoSmall className={styles.markerLogo} />
      </span>
      <span className={styles.markerStem} />
    </div>
  );
}

function createMarkerElement(): HTMLElement {
  const shell = document.createElement("div");
  shell.innerHTML = renderToStaticMarkup(<MarkerPin />);
  const pin = shell.firstElementChild;
  if (!(pin instanceof HTMLElement)) {
    throw new Error("ContactSheetMap: failed to build marker element");
  }
  return pin;
}

export function ContactSheetMap({ active, ariaLabel }: ContactSheetMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const token = getMapboxAccessToken();

  useEffect(() => {
    if (!active || !token) return;
    const container = containerRef.current;
    if (!container) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/light-v11",
      center: [STUDIO_COORDINATES.lng, STUDIO_COORDINATES.lat],
      zoom: 14.35,
      bearing: -12,
      pitch: 38,
      attributionControl: false,
      cooperativeGestures: true,
    });

    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "top-right",
    );

    const markerElement = createMarkerElement();

    const marker = new mapboxgl.Marker({
      element: markerElement,
      anchor: "bottom",
      offset: [0, -2],
    })
      .setLngLat([STUDIO_COORDINATES.lng, STUDIO_COORDINATES.lat])
      .addTo(map);

    mapRef.current = map;

    const resize = () => map.resize();
    const id = window.requestAnimationFrame(resize);

    return () => {
      window.cancelAnimationFrame(id);
      marker.remove();
      map.remove();
      mapRef.current = null;
    };
  }, [active, token]);

  useEffect(() => {
    if (!active || !mapRef.current) return;
    mapRef.current.resize();
  }, [active]);

  return (
    <div className={styles.mapShell} aria-label={ariaLabel}>
      {token ? (
        <div ref={containerRef} className={styles.mapCanvas} />
      ) : (
        <div className={styles.mapFallback} role="img" aria-label={ariaLabel}>
          <div className={styles.markerHostStatic}>
            <MarkerPin />
          </div>
        </div>
      )}
      <div className={styles.mapVignette} aria-hidden="true" />
    </div>
  );
}
