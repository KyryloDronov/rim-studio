"use client";

import { Navigation } from "lucide-react";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import {
  STUDIO_ADDRESS_LINE1,
  STUDIO_ADDRESS_LINE2,
  STUDIO_COORDINATES,
  buildGoogleDirectionsUrl,
} from "@/content/studio-location";

import styles from "./style.module.css";

export type StudioDirectionsModalCopy = Readonly<{
  directionsModalTitle: string;
  directionsModalBody: string;
  directionsModalHint: string;
  directionsModalCancelLabel: string;
  directionsModalCloseLabel: string;
  routeLabel: string;
}>;

type StudioDirectionsModalProps = Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  copy: StudioDirectionsModalCopy;
}>;

export function StudioDirectionsModal({
  open,
  onOpenChange,
  copy,
}: StudioDirectionsModalProps) {
  const directionsUrl = buildGoogleDirectionsUrl(
    STUDIO_COORDINATES.lat,
    STUDIO_COORDINATES.lng,
  );

  const openGoogleMaps = () => {
    window.open(directionsUrl, "_blank", "noopener,noreferrer");
    onOpenChange(false);
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={copy.directionsModalTitle}
      description={copy.directionsModalBody}
      closeLabel={copy.directionsModalCloseLabel}
      panelClassName={styles.panel}
      footer={
        <div className={styles.footer}>
          <Button
            type="button"
            variant="accent"
            size="md"
            block
            expandFromIcon
            expandWhen
            icon={<Navigation strokeWidth={1.75} aria-hidden />}
            onClick={openGoogleMaps}
          >
            {copy.routeLabel}
          </Button>
          <Button
            type="button"
            variant="dark"
            size="md"
            block
            onClick={() => onOpenChange(false)}
          >
            {copy.directionsModalCancelLabel}
          </Button>
        </div>
      }
    >
      <div className={styles.addressCard}>
        <p className={styles.addressLine}>{STUDIO_ADDRESS_LINE1}</p>
        <p className={styles.addressMuted}>{STUDIO_ADDRESS_LINE2}</p>
      </div>
      <p className={styles.hint}>{copy.directionsModalHint}</p>
    </Modal>
  );
}
