"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import {
  getMapboxAccessToken,
  STUDIO_COORDINATES,
} from "@/content/studio-location";
import { createStudioMapMarkerElement, StudioMapMarkerPin } from "./marker";

import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./style.module.css";

export type StudioMapCamera = Readonly<{
  zoom?: number;
  bearing?: number;
  pitch?: number;
}>;

type StudioMapProps = Readonly<{
  active: boolean;
  ariaLabel: string;
  className?: string;
  camera?: StudioMapCamera;
  showNavigation?: boolean;
  /** Mapbox scroll-wheel overlay — off for full-bleed visit map. */
  cooperativeGestures?: boolean;
  /** Pan / zoom / wheel — off for decorative full-bleed maps. */
  interactive?: boolean;
  /** Pass wheel/touch to the page (use with `interactive={false}`). */
  pointerEventsNone?: boolean;
}>;

const DEFAULT_CAMERA: StudioMapCamera = {
  zoom: 14.35,
  bearing: -12,
  pitch: 38,
};

export function StudioMap({
  active,
  ariaLabel,
  className,
  camera = DEFAULT_CAMERA,
  showNavigation = true,
  cooperativeGestures = true,
  interactive = true,
  pointerEventsNone = false,
}: StudioMapProps) {
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
      zoom: camera.zoom ?? DEFAULT_CAMERA.zoom,
      bearing: camera.bearing ?? DEFAULT_CAMERA.bearing,
      pitch: camera.pitch ?? DEFAULT_CAMERA.pitch,
      attributionControl: false,
      cooperativeGestures,
      interactive,
      scrollZoom: interactive,
      boxZoom: interactive,
      dragRotate: interactive,
      dragPan: interactive,
      keyboard: interactive,
      doubleClickZoom: interactive,
      touchZoomRotate: interactive,
      touchPitch: interactive,
    });

    if (showNavigation) {
      map.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        "top-right",
      );
    }

    const markerElement = createStudioMapMarkerElement();

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
  }, [
    active,
    token,
    camera.bearing,
    camera.pitch,
    camera.zoom,
    showNavigation,
    cooperativeGestures,
    interactive,
  ]);

  useEffect(() => {
    if (!active || !mapRef.current) return;
    mapRef.current.resize();
  }, [active]);

  const rootClass = [
    styles.root,
    pointerEventsNone ? styles.pointerNone : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass} aria-label={ariaLabel}>
      {token ? (
        <div ref={containerRef} className={styles.canvas} />
      ) : (
        <div className={styles.fallback} role="img" aria-label={ariaLabel}>
          <StudioMapMarkerPin />
        </div>
      )}
    </div>
  );
}
