'use client';

import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import styles from "@ui/review-form.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {createReview} from '@lib/action'
import Link from 'next/dist/client/link';

interface ReviewFormProps {
    params: Promise<{ id: string }>;
}

interface Errors {
    rating?: string;
    reviewText?: string;
}

interface Product {
    id: string;
    name: string;
    image_url: string;
}

export default function ReviewForm({ params }: ReviewFormProps) {
    const { data: session, status } = useSession();
    const userId = session?.user?.id;
    console.log("User ID:", userId);

    const [productId, setProductId] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const [product, setProduct] = useState<Product | null>(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Unwrap the params promise
    useEffect(() => {
        params.then(async ({ id }) => {
            setProductId(id);
            const res = await fetch(`/api/products/${id}`);
            const data = await res.json();
            setProduct(data);
            console.log(data);
        });
    }, [params]);

    if (!session || !session.user) {
        return (
            <div>
                <h2>Please Sign In to Write a Review</h2>
                <p>You must be signed in to submit a review. Please <Link href="/api/auth/signin">sign in</Link> to continue.</p>
            </div>
        );
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (rating === 0) {
            newErrors.rating = 'Please select a rating';
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
            //await new Promise(resolve => setTimeout(resolve, 1000)); // This simulates a network request
            if (!userId) throw new Error('User not authenticated');
            if (!productId) throw new Error('Product ID is missing');
            await createReview(reviewText, rating, userId, productId);
            
            //alert('Thank you! Your review has been submitted successfully.');
            // Return to product page after submission
            if (product) {
                window.location.href = `/product/${product.id}`;
            }
        } catch (error) {
            console.error('Error submitting review:', error);
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
                        Share your experience with product {product ? `"${product.name}"` : ''}
                    </p>


                    <div className={styles.imageContainer}>
                        {!imageLoaded && <div className={styles.imageSkeleton} />}
                        {product && (
                            <Image
                                src={product.image_url}
                                alt={product.name}
                                width={400}
                                height={300}
                                className={styles.productImage}
                                priority
                                onLoad={() => setImageLoaded(true)}
                            />
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
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