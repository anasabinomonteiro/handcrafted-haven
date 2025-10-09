import Link from "next/link";
import Image from "next/image";
import styles from "@ui/dashboard/dashboard.module.css"
import { getProductsByUserId, } from "../lib/data";
import { auth } from "../../auth.config";
import { DynamicTable } from "@ui/dashboard/dynamic-table";
import { CreateProduct } from "@ui/dashboard/buttons";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
  user_id: string;

};

export default async function Page() {

    const session = await auth();
    if (session?.user.role !== "seller") return <div>YOU ARE NOT AUTHORISED TO VIEW THIS PAGE</div>;
    if (!session?.user?.id) return null;
    const products = (await getProductsByUserId(session.user.id)) as Product[];

  //dynamically fetch categories from the database
  
  return (
    <div className={styles.dashboardPageContainer}>
      <div className={styles.dashboardMiniContainer}>
        <h1>Products Management</h1>
        <CreateProduct />
        <DynamicTable products={products}/>
      </div>
    </div>
  );
}