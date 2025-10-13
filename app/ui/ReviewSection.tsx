// ./app/ui/ReviewSection.tsx
import React from "react";
import Link from "next/link";
import RatingBadge from "./RatingBadge";
import styles from "@ui/reviewSection.module.css";

export interface Review {
  user: string;
  rating: number;
  review_text: string;
}

interface Props {
  reviews: Review[];
}

export const getReviewsStats = (reviews: Review[])=> {
  if(!reviews || reviews.length == 0) return {count: 0, avg: 0};
  const count = reviews.length;
  const avg = reviews.reduce((acc, prev)=> acc + prev.rating, 0) / count;

  return {count, avg};
}

export default function ReviewSection({ reviews }: Props) {
  const {count, avg} = getReviewsStats(reviews);

  return (
    <section id="reviews" className={styles.reviewSection}>
      <aside className={styles.summary}>
        <div className={styles.summaryReview}>
          <RatingBadge rating={avg} count={count} reviewSummary />
          <p className={styles.total}>{count} reviews</p>
        </div>

        <Link href="/review-form/id" className={styles.btnReview}>
        Write a review
        </Link>
       
      </aside>

      <ul className={styles.reviewList}>
        {reviews.map((r, i) => (
          <li key={i} className={styles.reviewItem}>
            <strong>{r.user}</strong>
            <RatingBadge rating={r.rating} count={1} hideRatings/>
            <p>{r.review_text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
