// ./app/categories/[categoryId]/products/page.tsx
import { getProductsByCategory } from "../../../lib/data";
import Image from "next/image";
import styles from "@ui/products-listing.module.css";
import Link from "next/link";
import { getCategoryById, getAverageReviewsByProductIdDb } from "../../../lib/data";
//import {AverageRating} from "@ui/average-rating";
import ProductRating from "@ui/ProductRating";



export default async function Page(props: { params: Promise<{ categoryId: string }> }) {
    const params = await props.params;
    const categoryId = params.categoryId;
       
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

     const reviews = await Promise.all(
       products.map((product) => getAverageReviewsByProductIdDb(product.id))
     );
    
    return (
        <div className={styles.productsListingPageContainer}>
            <h1>Products in {category[0].name} Category </h1>
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

