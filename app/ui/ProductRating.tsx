// ./app/ui/ProductRating.tsx
"use client";

import RatingBadge from "@ui/RatingBadge";
import { useRouter } from "next/navigation";

interface Props {
  productId: string;
  avg: number;
  count: number;
}

export default function ProductRating({ productId, avg, count }: Props) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/product/${productId}#reviews`);
  };

  return (
    // <RatingBadge rating={avg} count={count} onClick={()=> handleClick} />
     <div onClick={handleClick}>
      <RatingBadge rating={avg} count={count} />
    </div>
  );
}