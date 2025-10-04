import Image from "next/image";
import styles from "@ui/products-listing.module.css";
import Link from "next/link";
import { getAllProducts } from "../lib/data";

//dynamically fetch all products from the database
export default async function Page() {
       
    const products = await getAllProducts() as Array<{
        id: string;
        name: string;
        description: string;
        price: number;
        image_url: string;
    }>;
    //get the reviews for each product
    //  const reviews = await Promise.all(products.map(product => getReviewsByProductId(product.id) as unknown as Array<{
    //     id: string;
    //     review_text: string;
    //     rating: number;
    //     product_id: string;
    //     user_id: string;
    //  }>));
    console.log("Products:", products);
    return (
        <div className={styles.productsListingPageContainer}>
            <h1>All Products</h1>
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
