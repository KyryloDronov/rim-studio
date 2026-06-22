/** Screen captures shown inside the phone mockup — same canvas as `hands_phone`. */
export const TESTIMONIAL_SCREEN_FRAMES = [
  "/img/reviews/review_1.png",
  "/img/reviews/review_2.png",
] as const;

export const TESTIMONIAL_PHONE_FRAME = "/img/reviews/hands_phone.png";

export function getTestimonialScreenSrc(itemIndex: number): string {
  return TESTIMONIAL_SCREEN_FRAMES[
    itemIndex % TESTIMONIAL_SCREEN_FRAMES.length
  ];
}

export function getTestimonialScreenIndex(itemIndex: number): number {
  return itemIndex % TESTIMONIAL_SCREEN_FRAMES.length;
}
