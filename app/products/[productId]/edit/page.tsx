import Link from "next/link";
import styles from "@ui/seller-page.module.css"
import { auth } from "../../../../auth.config";
import { updateRole } from "../../../lib/action";
import postgres from "postgres";
import { EditProductForm, Product, Category } from "@ui/dashboard/edit-product-form";
import { SessionProvider } from "next-auth/react"
import { Redirect } from "next";
import { getCategoriesNameAndId } from "../../../lib/data";
import { getProductByProductId } from "../../../lib/data";

export default async function Page(props: { params: Promise<{ productId: string }> }) { 
    const params = await props.params;
    const productId = params.productId;
    // const categories = await getCategoriesNameAndId() as [];
    // const product = await getProductByProductId(productId) as [];
    // const [categries, proudct] = await Promise.all([getCategoriesNameAndId, getProductByProductId(productId)])
    const [product, categories] = await Promise.all([
            getProductByProductId(productId),
            getCategoriesNameAndId()
        ]) as [Array<{
            id: string;
            name: string;
            description: string;
            price: number;
            image_url: string;
            user_id: string;
            category_id: string;
        }>, Array<{
            name: string;
            id: string;
        }>];

    const session = await auth();
  if (session?.user.id === "seller") return <h1>YOU ARE ALREADY A SELLER!</h1>
  return (
    <div className={styles.sellerFormDiv}>
        <SessionProvider>
            <EditProductForm product={product} categories={categories} />
        </SessionProvider>
    </div>
  );
}