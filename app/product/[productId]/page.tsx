// app/product/[productId]/page.tsx
import Image from "next/image";
import ProductScroll from "./ProductScroll";
import productStyles from "./product.module.css";
import RatingBadge from "@ui/RatingBadge";
import ReviewSection, { Review } from "@ui/ReviewSection";
import { getReviewsStats } from "@ui/ReviewSection";
import { getReviewsByProductId, getProductById } from "../../lib/data";

type Product = {
  id: string;
  name: string;
  image_url: string;
  price: number;
  description: string;
};

async function getProductByIdAndReviews(productId: string) {
  const product = (await getProductById(productId)) as Product | null;
  const reviews = (await getReviewsByProductId(productId)) as Review[];
  return {
    product,
    reviews,
  };
}

export default async function ProductPage(props: { params: Promise<{ productId: string }> }) {
  const { productId } = await props.params;

  const { product, reviews } = await getProductByIdAndReviews(productId);

  if (!product) {
    return <p>Not found product</p>;
  }

  const { avg, count } = getReviewsStats(reviews as Review[]);

  return (
    <ProductScroll>
      <div className={productStyles.productHeader}>
        <div className={productStyles.productImageContainer}>
          <Image
            src={product.image_url}
            alt={product.name}
            width={400}
            height={300}
            className={productStyles.productImage}
            priority
          />
        </div>

        <div className={productStyles.productDetails}>
          <h1>{product.name}</h1>

          <div className={productStyles.ratingContainer}>
            <RatingBadge
              rating={avg}
              count={count}
              // onClick={() => {}}
            />
            <span className={productStyles.price}>${product.price}</span>
          </div>

          <p className={productStyles.description}>{product.description}</p>

          <button className={productStyles.addToCartButton}>ADD TO CART</button>
        </div>
      </div>

      <div className={productStyles.divider}></div>

      <ReviewSection reviews={reviews} />
    </ProductScroll>
  );
}
