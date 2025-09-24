'use client';

import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import styles from "@ui/review-form.module.css";

interface ReviewFormProps {
    params: Promise<{ id: string }>;
}

export default function ReviewForm({ params }: ReviewFormProps) {
    const [productId, setProductId] = useState<string>('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [reviewerName, setReviewerName] = useState('');
    const [reviewerEmail, setReviewerEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Unwrap the params promise
    useState(() => {
        params.then(({ id }) => setProductId(id));
    });

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!reviewerName.trim()) {
            newErrors.reviewerName = 'Name is required';
        }
        
        if (!reviewerEmail.trim()) {
            newErrors.reviewerEmail = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(reviewerEmail)) {
            newErrors.reviewerEmail = 'Please enter a valid email address';
        }

        if (rating === 0) {
            newErrors.rating = 'Please select a rating';
        }

        if (!reviewTitle.trim()) {
            newErrors.reviewTitle = 'Review title is required';
        }

        if (!reviewText.trim()) {
            newErrors.reviewText = 'Review text is required';
        } else if (reviewText.trim().length < 10) {
            newErrors.reviewText = 'Review must be at least 10 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // API REQUEST OR DATABASE CALL TO SUBMIT REVIEW
            await new Promise(resolve => setTimeout(resolve, 1000)); // This simulates a network request
            
            console.log('Review submitted:', {
                productId,
                rating,
                reviewTitle,
                reviewText,
                reviewerName,
                reviewerEmail,
            });

            // Reset form
            setRating(0);
            setReviewTitle('');
            setReviewText('');
            setReviewerName('');
            setReviewerEmail('');
            setErrors({});
            
            alert('Thank you! Your review has been submitted successfully.');
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('There was an error submitting your review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStars = () => {
        return (
            <div className={styles.starRating}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className={styles.starButton}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        {star <= (hoverRating || rating) ? (
                            <StarIcon className={`${styles.starIcon} ${styles.starFilled}`} />
                        ) : (
                            <StarOutlineIcon className={`${styles.starIcon} ${styles.starEmpty}`} />
                        )}
                    </button>
                ))}
                <span className={styles.ratingText}>
                    {rating > 0 && `${rating} out of 5 stars`}
                </span>
            </div>
        );
    };

    return (
        <div className={styles.pageContainer}>
            <main className={styles.main}>
                <div className={styles.formCard}>
                    <h1 className={styles.title}>
                        Write a Review
                    </h1>
                    <p className={styles.subtitle}>
                        Share your experience with this handcrafted product (ID: {productId})
                    </p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Personal Information */}
                        <div className={styles.inputGrid}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="reviewerName" className={styles.label}>
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    id="reviewerName"
                                    value={reviewerName}
                                    onChange={(e) => setReviewerName(e.target.value)}
                                    className={`${styles.input} ${errors.reviewerName ? styles.error : ''}`}
                                    placeholder="Enter your full name"
                                />
                                {errors.reviewerName && (
                                    <p className={styles.errorMessage}>{errors.reviewerName}</p>
                                )}
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="reviewerEmail" className={styles.label}>
                                    Your Email *
                                </label>
                                <input
                                    type="email"
                                    id="reviewerEmail"
                                    value={reviewerEmail}
                                    onChange={(e) => setReviewerEmail(e.target.value)}
                                    className={`${styles.input} ${errors.reviewerEmail ? styles.error : ''}`}
                                    placeholder="Enter your email address"
                                />
                                {errors.reviewerEmail && (
                                    <p className={styles.errorMessage}>{errors.reviewerEmail}</p>
                                )}
                            </div>
                        </div>

                        {/* Rating */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>
                                Overall Rating *
                            </label>
                            {renderStars()}
                            {errors.rating && (
                                <p className={styles.errorMessage}>{errors.rating}</p>
                            )}
                        </div>

                        {/* Review Title */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="reviewTitle" className={styles.label}>
                                Review Title *
                            </label>
                            <input
                                type="text"
                                id="reviewTitle"
                                value={reviewTitle}
                                onChange={(e) => setReviewTitle(e.target.value)}
                                className={`${styles.input} ${errors.reviewTitle ? styles.error : ''}`}
                                placeholder="Summarize your review in a few words"
                                maxLength={100}
                            />
                            {errors.reviewTitle && (
                                <p className={styles.errorMessage}>{errors.reviewTitle}</p>
                            )}
                        </div>

                        {/* Review Text */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="reviewText" className={styles.label}>
                                Your Review *
                            </label>
                            <textarea
                                id="reviewText"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                rows={6}
                                className={`${styles.textarea} ${errors.reviewText ? styles.error : ''}`}
                                placeholder="Tell us about your experience with this product. What did you like? What could be improved?"
                                maxLength={1000}
                            />
                            <div className={styles.textareaInfo}>
                                {errors.reviewText ? (
                                    <p className={styles.errorMessage}>{errors.reviewText}</p>
                                ) : (
                                    <p className={styles.helperText}>
                                        Minimum 10 characters required
                                    </p>
                                )}
                                <p className={styles.characterCount}>
                                    {reviewText.length}/1000
                                </p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className={styles.submitSection}>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`${styles.submitButton} ${isSubmitting ? styles.loading : ''}`}
                            >
                                {isSubmitting ? (
                                    <span className={styles.loadingContent}>
                                        <svg className={styles.loadingSpinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting Review...
                                    </span>
                                ) : (
                                    'Submit Review'
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Additional Information */}
                    <div className={styles.guidelines}>
                        <h3 className={styles.guidelinesTitle}>
                            Review Guidelines
                        </h3>
                        <ul className={styles.guidelinesList}>
                            <li>• Be honest and detailed in your review</li>
                            <li>• Focus on the product quality, craftsmanship, and your experience</li>
                            <li>• Avoid offensive language or personal attacks</li>
                            <li>• Reviews are publicly visible to help other customers</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}