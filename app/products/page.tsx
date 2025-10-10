import Image from "next/image";
import styles from "@ui/products-listing.module.css";
import Link from "next/link";
import { getAllProducts, getAverageReviewsByProductIdDb } from "../lib/data";
import ProductRating from "@ui/ProductRating";


export default async function Page(props: { params: Promise<{ productId: string }> }) {
       
    const products = await getAllProducts() as Array<{
        id: string;
        name: string;
        description: string;
        price: number;
        image_url: string;
    }>;
<<<<<<< HEAD

      const reviews = await Promise.all(
        products.map((product) => getAverageReviewsByProductIdDb(product.id))
      );
=======
    //get the reviews for each product
    //  const reviews = await Promise.all(products.map(product => getReviewsByProductId(product.id) as unknown as Array<{
    //     id: string;
    //     review_text: string;
    //     rating: number;
    //     product_id: string;
    //     user_id: string;
    //  }>));
    //console.log("Products:", products);
>>>>>>> main
    return (
        <div className={styles.productsListingPageContainer}>
            <h1>All Products</h1>
            <div className={styles.productsListingLinksDiv}>
                {products.map((product, index) => {
                    const { avg, count } = reviews[index];
                    return (
                         <div key={product.id} className={styles.productsListingLink}>                            
                            <Link 
                                href={`/product/${product.id}`}
                                style={{ textDecoration: 'none', color: 'inherit' }} 
                            >
                                <Image className={styles.productsListingLinkImages} src={product.image_url} alt={product.name} width={200} height={200} />
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <p className={styles.productsListingLinkPrice}>Price: ${product.price}</p>
                            </Link>
                           
                            <ProductRating productId={product.id} avg={avg} count={count} />
                            
                            <button className={styles.addToCartButton}>ADD TO CART</button>
                        </div>
                    );
                })}
            
            </div>
        </div>
    );
}
