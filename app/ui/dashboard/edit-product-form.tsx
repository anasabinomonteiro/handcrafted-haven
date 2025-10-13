'use client'
import { useActionState } from "react"
import { useSession } from "next-auth/react"
import { updateRole } from "../../lib/action"
import styles from '@ui/dashboard/product-form.module.css'
import { updateProduct, State } from "../../lib/action"
import Image from "next/image"

export type Category = {
    name: string;
    id: string;
};
export type Product = {
    name: string;
    description: string;
    image_url: string;
    price: number;
    category_id: string;
    id: string;
    user_id: string;
}

export function EditProductForm({
categories,
product,
}: {
  categories: Category[];
  product: Product[];
}) {
    // const params = await props.params;
    // const productId = params.productId;
    // const categories = props.categories
    // const product = props.product
    const { data: session, status } = useSession();
    const updateProductById = updateProduct.bind(null, product[0].id)
    
    return (
        <form action={updateProductById} className={styles.form}>
            <h1>UPDATE PRODUCT: <span className={styles.productName}>{product[0].name}</span></h1>
            <p>Please note that all fields are required (<span>*</span>)</p>
            <Image className={styles.productImage} src={product[0].image_url} height={200} width={200} alt="Product Image" />
            <label htmlFor="product_name">Product Name (<span>*</span>)</label>
            <input aria-describedby="product-name-error" title="Type the name of the product" type="text" id="product_name" name="product_name" defaultValue={product[0].name} required/>
            {/* <div id="product-name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.productName &&
                state.errors.productName.map((error: string) => (
                    <p key={error}>
                    {error}
                    </p>
                ))}
            </div> */}
            <label htmlFor="product_description">Product Description (<span>*</span>)</label>
            <textarea aria-describedby="product-description-error" title="Type the description of the product" id="product_description" name="product_description" defaultValue={product[0].description} required></textarea>
            {/* <div id="product-description-error" aria-live="polite" aria-atomic="true">
                {state.errors?.productDescription &&
                state.errors.productDescription.map((error: string) => (
                    <p key={error}>
                    {error}
                    </p>
                ))}
            </div> */}
            <label htmlFor="product_price">Product Price (<span>*</span>)</label>
            <input aria-describedby="product-price-error" type="number" title="Type in the price of the product" name="product_price" id="product_price" min={0} defaultValue={product[0].price} required/>
            {/* <div id="product-price-error" aria-live="polite" aria-atomic="true">
                {state.errors?.productPrice &&
                state.errors.productPrice.map((error: string) => (
                    <p className={styles.errors} key={error}>
                    {error}
                    </p>
                ))}
            </div> */}
            {/* <label htmlFor="product_image">Product Image (<span>*</span>)</label> */}
            {/* <input type="file" name="product_image" id="product_image" /> */}
            <label htmlFor="product_category">Product Category (<span>*</span>)</label>
            <select aria-describedby="category-error" name="category_id" id="category_id" defaultValue={product[0].category_id} required>
                <option disabled>Please select a category</option>
                {categories.map((category) => (
                    <option key={category.id} value={`${category.id}`}>
                        {category.name}
                    </option>
                ))}
            </select>
            {/* <div id="category-error" aria-live="polite" aria-atomic="true">
                {state.errors?.categoryId &&
                state.errors.categoryId.map((error: string) => (
                    <p key={error}>
                    {error}
                    </p>
                ))}
            </div> */}
            <input aria-describedby="user-id-error" type="hidden" name="user_id" id="user_id" defaultValue={`${product[0].user_id}`} />
            {/* <div id="user-id-error" aria-live="polite" aria-atomic="true">
                {state.errors?.userId &&
                state.errors.userId.map((error: string) => (
                    <p key={error}>
                    {error}
                    </p>
                ))}
            </div> */}
            <button type="submit" >Upload Product</button>
        </form>
    )
}