import Link from "next/link";
import styles from "@ui/seller-page.module.css"
import { auth } from "../../../auth.config";
import { updateRole } from "../../lib/action";
import postgres from "postgres";
import { CreateProductForm } from "@ui/dashboard/create-product-form";
import { SessionProvider } from "next-auth/react"
import { Redirect } from "next";
import { getCategoriesNameAndId } from "../../lib/data";
import { notFound } from 'next/navigation';

export default async function Page() {
    const categories = await getCategoriesNameAndId() as [];
    
    
    const session = await auth();
  if (session?.user.id === "seller") return <h1>YOU ARE ALREADY A SELLER!</h1>
  if (!categories) {notFound()};
  return (
    <div className={styles.sellerFormDiv}>
        <SessionProvider>
            <CreateProductForm categories = {categories} />
        </SessionProvider>
    </div>
  );
}