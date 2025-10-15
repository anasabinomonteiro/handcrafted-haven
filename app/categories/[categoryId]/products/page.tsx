// ./app/categories/[categoryId]/products/page.tsx
import { getProductsByCategory } from "../../../lib/data";
import Image from "next/image";
import styles from "@ui/products-listing.module.css";
import Link from "next/link";
import { getCategoryById, getAverageReviewsByProductIdDb } from "../../../lib/data";
//import {AverageRating} from "@ui/average-rating";
import ProductRating from "@ui/ProductRating";
import Search from "@ui/search";
import { fetchProductsByQuery } from "../../../lib/data";
import FilterByPrice from "@ui/filter-by-price";




export default async function Page(props: { params: Promise<{ categoryId: string }>, searchParams?: Promise<{
    query?: string;
    page?: string;
    min?: string;
  }> 
 }) {
    const params = await props.params;
    const categoryId = params.categoryId;
    const searchParams = await props.searchParams;
    const query = searchParams?.query;
    const min = searchParams?.min;

    if (query) {
        const [products, category] = await Promise.all([
        fetchProductsByQuery(query),
        getCategoryById(categoryId)
    ]) as [Array<{
        id: string;
        user_id: string;
        name: string;
        description: string;
        price: number;
        image_url: string;
    }>, Array<{
        name: string;
    }>];

        if (min) {
            const mmin = parseFloat(min);
            const filteredProducts = products.filter(product => product.price >= mmin)
            
            const reviews = await Promise.all(
                filteredProducts.map((product) => getAverageReviewsByProductIdDb(product.id))
            );
        
            return (
                <>
                <div className={styles.filterBar}>
                    <FilterByPrice />
                    <Search placeholder='Search Products...' />
                </div>
                <div className={styles.productsListingPageContainer}>
                    <h1>Products in {category[0].name} Category </h1>
                    <div className={styles.productsListingLinksDiv}>
                        {filteredProducts.map((product, index) => {                  
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
                </>
            );
        }

        const reviews = await Promise.all(
        products.map((product) => getAverageReviewsByProductIdDb(product.id))
        );

        return (
            <>
            <div className={styles.filterBar}>
                <FilterByPrice />
                <Search placeholder='Search Products...' />
            </div>
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
            </>
        );
    }

       
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

     if (min) {
        const mmin = parseFloat(min);
        const filteredProducts = products.filter(product => product.price >= mmin)
        
        const reviews = await Promise.all(
            filteredProducts.map((product) => getAverageReviewsByProductIdDb(product.id))
        );
    
        return (
            <>
            <div className={styles.filterBar}>
                <FilterByPrice />
                <Search placeholder='Search Products...' />
            </div>
            <div className={styles.productsListingPageContainer}>
                <h1>Products in {category[0].name} Category </h1>
                <div className={styles.productsListingLinksDiv}>
                    {filteredProducts.map((product, index) => {                  
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
            </>
        );
     }
     const reviews = await Promise.all(
       products.map((product) => getAverageReviewsByProductIdDb(product.id))
     );

        
    return (
        <>
        <div className={styles.filterBar}>
            <FilterByPrice />
            <Search placeholder='Search Products...' />
        </div>
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
        </>
    );
}

