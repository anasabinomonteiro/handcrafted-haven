import Image from "next/image";
import styles from "@ui/products-listing.module.css";
import Link from "next/link";
import { getAllProducts, getAverageReviewsByProductIdDb } from "../lib/data";
import ProductRating from "@ui/ProductRating";
import Search from "@ui/search";
import { fetchProductsByQuery } from "../lib/data";
import FilterByPrice from "@ui/filter-by-price";
import filterStyles from "@ui/filter.module.css"



export default async function Page(props: { params: Promise<{ productId: string }>, searchParams?: Promise<{
    query?: string;
    page?: string;
    min?: string;
  }> 
 }) {
       const searchParams = await props.searchParams;
    const query = searchParams?.query;
    const min = searchParams?.min

    if (query) {
        const products = await fetchProductsByQuery(query);
        if (products) {
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
                        <h1>All products </h1>
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
                <h1>All Products </h1>
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
    }
        

    const products = await getAllProducts() as Array<{
        id: string;
        name: string;
        description: string;
        price: number;
        image_url: string;
    }>;
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
                        <h1>All Products </h1>
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
        </>
    );
}
