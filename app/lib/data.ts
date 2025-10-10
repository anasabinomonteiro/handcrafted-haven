import postgres from "postgres";
import { Category } from "@ui/dashboard/create-product-form";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});

export async function getCategories() {
    try {
        const categories = await sql`SELECT id, name, image_url FROM categories`;
        return categories;
    } catch (error) {
        return error;
    }
}

export async function getProductsByCategory(categoryId: string) {
    try {
        const products = await sql`SELECT * FROM products WHERE category_id = ${categoryId}`;
        return products;
    } catch (error) {
        return error;
    }
}

export async function getAllProducts() {
    try {
        const products = await sql`SELECT * FROM products`;
        return products;
    } catch (error) {
        return error;
    }
}

//function to get reviews by product id
export async function getReviewsByProductId(productId: string) {
    try {
        const reviews = await sql`SELECT * FROM reviews WHERE product_id = ${productId}`;
        return reviews;
    } catch (error) {
        return error;
    }
}

//function to get category by id
export async function getCategoryById(categoryId: string) {
    try {
        const category = await sql`
        SELECT name from categories WHERE id = ${categoryId}`;
        return category;
    } catch (error) {
        return error;
    }
}

//function to get user role by id
export async function getUserRoleByEmail(userEmail: string) {
    try {
        const userRole = await sql`
        SELECT role FROM users WHERE email = ${userEmail}`;
        return userRole;
    } catch (error) {
        return error;
    }
}

//function to get products by user id
export async function getProductsByUserId(userId: string) {
    try {
        const products = await sql`
        SELECT * FROM products WHERE user_id = ${userId}`;
        return products;
    } catch (error) {
        return error;
    }
}

export async function getCategoriesNameAndId() {
    try {
        const categories = await sql<Category[]>`SELECT id, name FROM categories`;
        return categories;
    } catch (error) {
        return error;
    }
}

export async function getProductByProductId(productId: string) {
    try {
        const product = await sql`SELECT * FROM products WHERE id = ${productId}`;
        return product;
    } catch (error) {
        return error;
    }
}