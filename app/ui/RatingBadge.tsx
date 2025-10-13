// ./app/ui/RatingBadge.tsx
"use client"
import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import styles from "@ui/ratingBadge.module.css";

interface Props {
  rating: number;
  count: number;
  onClick?: () => void;
  reviewSummary?: boolean;
  hideRatings?: boolean;
}

export default function RatingBadge({
  rating,
  count,
  onClick,
  reviewSummary = false,
  hideRatings = false,
}: Props) {

  const stars = Array.from({ length: 5 }, (_, i) => {
    if (rating >= i + 1) return "full";
    if (rating >= i + 0.5) return "half";
    return "empty";
  });

  const renderStars = (type: string, i: number) => {
    switch (type) {
      case "full":
        return (
          <li key={i} className={styles.starItem}>
            <StarIcon className={`${styles.starIcon} ${styles.starFilled}`} />
          </li>
        );
      case "half":
        return (
          <li key={i} className={styles.starItem}>
            <span className={styles.starHalfWrapper}>
              <StarIcon
                className={`${styles.starIcon} ${styles.starHalfFilled}`}
              />
              <StarOutlineIcon
                className={`${styles.starIcon} ${styles.starHalfOutline}`}
              />
            </span>
          </li>
        );

      default:
        return (
          <li key={i} className={styles.starItem}>
            <StarOutlineIcon
              className={`${styles.starIcon} ${styles.starEmpty}`}
            />
          </li>
        );
    }
  };

  const ammountClassName: string = reviewSummary ? "amountBig" : "amount";


  return (
    <div
      className={`${styles.ratingBadge} ${onClick ? styles.clickable : ""}`}
      aria-label={`Average rating: ${rating?.toFixed(1)} out of 5 stars`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {!hideRatings && (
        <small
          className={`${styles[ammountClassName]} ${styles.ratingAverage}`}
        >
          {rating?.toFixed(1)}
        </small>
      )}

      <ul className={styles.starList} role="img" aria-hidden="true">
        {stars.map((type, i) => renderStars(type, i))}
      </ul>

      {!hideRatings && (
        <small className={`${styles.amount} ${styles.ratingCount}`}>
          ({count})
        </small>
      )}
    </div>
  );
}
