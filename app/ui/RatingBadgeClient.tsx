"use client";
import RatingBadge from "@ui/RatingBadge";

export default function RatingBadgeClient({ rating, count }: { rating: number; count: number }) {
  const handleScrollToReviews = () => {
    const el = document.getElementById("reviews");
    el?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", "#reviews");
  };

  return <RatingBadge rating={rating} count={count} onClick={handleScrollToReviews} />;
}
