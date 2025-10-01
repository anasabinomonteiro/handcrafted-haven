import { getProductsByCategory } from "../../../lib/data";
import Image from "next/image";
import styles from "@ui/products-listing.module.css";
import Link from "next/link";
import { getReviewsByProductId, getCategoryById } from "../../../lib/data";
//import {AverageRating} from "@ui/average-rating";



//dynamically fetch products based on categoryId from the database
export default async function Page({ params }: { params: { categoryId: string}}) {
    const { categoryId } =  await params;
       
    const [products, category] = await Promise.all([
        getProductsByCategory(categoryId),
        getCategoryById(categoryId)
    ]) as [Array<{
        id: string;
        name: string;
        description: string;
        price: number;
        image_url: string;
    }>, Array<{
        name: string;
    }>];
    //get the reviews for each product
     const reviews = await Promise.all(products.map(product => getReviewsByProductId(product.id) as unknown as Array<{
        id: string;
        review_text: string;
        rating: number;
        product_id: string;
        user_id: string;
     }>));
    return (
        <div className={styles.productsListingPageContainer}>
            <h1>Products in {category[0].name} Category </h1>
            <div className={styles.productsListingLinksDiv}>
                {products.map(product => {
                    // display reviews as stars
                    // const productReviews = reviews[products.findIndex(p => p.id === product.id)] || [];
                    // const numReviews = productReviews.length > 0 ? productReviews.length : 0;
                    // const averageRating =
                    //     productReviews.length > 0
                    //         ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
                    //         : 0;
                    return (
                        <Link key={product.id} className={styles.productsListingLink} href={`/products/${product.id}/product`}>
                            <Image className={styles.productsListingLinkImages} src={product.image_url} alt={product.name} width={200} height={200} />
                            {/* <AverageRating rating={averageRating} numReviews={numReviews} totalStars={5} /> */}
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p className={styles.productsListingLinkPrice}>Price: ${product.price}</p>
                            <button className={styles.addToCartButton}>ADD TO CART</button>
                        </Link>
                    );
                })}
            
            </div>
        </div>
    );
}

