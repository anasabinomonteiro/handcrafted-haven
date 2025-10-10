'use client'
import { useActionState } from "react"
import { useSession } from "next-auth/react"
import { updateRole } from "../../lib/action"
import styles from '@ui/dashboard/product-form.module.css'
import { createProduct, State } from "../../lib/action"

export type Category = {
    name: string;
    id: string;
};

export function CreateProductForm({ categories }: { categories: Category[] }) {
    const { data: session, status } = useSession();
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(createProduct, initialState);
    
    return (
        <form action={formAction} className={styles.form}>
            <h1>PRODUCT UPLOAD</h1>
            <p>Please note that all fields are required (<span>*</span>)</p>
            <label htmlFor="product_name">Product Name (<span>*</span>)</label>
            <input aria-describedby="product-name-error" title="Type the name of the product" type="text" id="product_name" name="product_name" placeholder="example: Golden Tea Cup" required/>
            <div id="product-name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.productName &&
                state.errors.productName.map((error: string) => (
                    <p key={error}>
                    {error}
                    </p>
                ))}
            </div>
            <label htmlFor="product_description">Product Description (<span>*</span>)</label>
            <input aria-describedby="product-description-error" title="Type the description of the product" type="text" id="product_description" name="product_description" placeholder="example: A well crafted cup that is durable and affordable" required/>
            <div id="product-description-error" aria-live="polite" aria-atomic="true">
                {state.errors?.productDescription &&
                state.errors.productDescription.map((error: string) => (
                    <p key={error}>
                    {error}
                    </p>
                ))}
            </div>
            <label htmlFor="product_price">Product Price (<span>*</span>)</label>
            <input aria-describedby="product-price-error" type="number" title="Type in the price of the product" name="product_price" id="product_price" min={0} placeholder="4000" required/>
            <div id="product-price-error" aria-live="polite" aria-atomic="true">
                {state.errors?.productPrice &&
                state.errors.productPrice.map((error: string) => (
                    <p className={styles.errors} key={error}>
                    {error}
                    </p>
                ))}
            </div>
            {/* <label htmlFor="product_image">Product Image (<span>*</span>)</label> */}
            {/* <input type="file" name="product_image" id="product_image" /> */}
            <label htmlFor="product_category">Product Category (<span>*</span>)</label>
            <select aria-describedby="category-error" name="category_id" id="category_id" required>
                <option disabled>Please select a category</option>
                {categories.map((category) => (
                    <option key={category.id} value={`${category.id}`}>
                        {category.name}
                    </option>
                ))}
            </select>
            <div id="category-error" aria-live="polite" aria-atomic="true">
                {state.errors?.categoryId &&
                state.errors.categoryId.map((error: string) => (
                    <p key={error}>
                    {error}
                    </p>
                ))}
            </div>
            <input aria-describedby="user-id-error" type="hidden" name="user_id" id="user_id" defaultValue={`${session?.user.id}`} />
            <div id="user-id-error" aria-live="polite" aria-atomic="true">
                {state.errors?.userId &&
                state.errors.userId.map((error: string) => (
                    <p key={error}>
                    {error}
                    </p>
                ))}
            </div>
            <button type="submit" >Upload Product</button>
        </form>
    )
}