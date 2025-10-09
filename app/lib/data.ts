import postgres from "postgres";

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
        // const reviews = await sql`SELECT * FROM reviews WHERE product_id = ${productId}`;
        const reviews = await sql`SELECT u.name AS user, r.* 
        FROM users AS u
        INNER JOIN reviews AS r ON u.id = r.user_id
        WHERE r.product_id = ${productId}`;
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

export async function getAverageReviewsByProductId(productId: string){
    try {
        const [result] = await sql`SELECT SUM(rating)/COUNT(*) AS avg, COUNT(*) AS count
        FROM reviews WHERE product_id = ${productId}`;

        return [result]; 
    }
    catch (error) {
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

export async function getAverageReviewsByProductIdDb(productId: string) {
    try {
        const [result] = await sql`
            SELECT                 
                COALESCE(SUM(rating)::float / NULLIF(COUNT(*), 0), 0) AS avg, 
                COUNT(*) AS count
            FROM reviews 
            WHERE product_id = ${productId}
        `;
        return {
            avg: parseFloat(result.avg),
            count: parseInt(result.count, 10)
        };
    } catch (error) {
        throw error;
    }
}

export async function getProductById(productId: string) {
    try {
        const [product] = await sql`SELECT * FROM products WHERE id = ${productId}`;
        
        return product;
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
