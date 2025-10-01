import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import Styles from '@ui/product-listing.module.css'


export default function AverageRating (rating: number, numReviews: number, totalStars = 5) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = Array.from({ length: totalStars }, (_, index) => {
        if (index < fullStars) {
        return <StarIcon key={index} color='#ffc107' />;
        } else if (index === fullStars && hasHalfStar) {
        return <StarIcon key={index} color="#ffc107" style={{ clipPath: 'inset(0 50% 0 0)' }} />;
        } else {
        return <StarOutlineIcon key={index} color="#ffc107" />;
        }
    });
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {stars}
            <span style={{ fontSize: '0.9rem' }}>
                {rating.toFixed(1)} ({numReviews} review(s))
            </span>
        </div>
    );
}