import Link from "next/link";
import styles from "@ui/seller-page.module.css"
import { auth } from "../../auth.config";
import { updateRole } from "../lib/action";
import postgres from "postgres";
import { SellerForm } from "@ui/seller-profile-form";
import { SessionProvider } from "next-auth/react"
import { Redirect } from "next";

export default async function Page() { 
    
    const session = await auth();
  if (session?.user.id === "seller") return <h1>YOU ARE ALREADY A SELLER!</h1>
  return (
    <div className={styles.sellerFormDiv}>
        <SessionProvider>
            <SellerForm />
        </SessionProvider>
    </div>
  );
}