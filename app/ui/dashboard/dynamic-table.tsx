'use client'
import Image from "next/image";
import { UpdateProduct } from "./buttons";
import { DeleteProduct } from "./buttons";
import styles from "@ui/dashboard/dashboard.module.css"


type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
  user_id: string;

};

export function DynamicTable({products}: {products: Product[]}) {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.tTable}>
            <thead>
                <tr>
                    <th className={styles.tHead}>S/N</th>
                    <th className={styles.tHead}>Name of Product</th>
                    <th className={styles.tHead}>Price of Product</th>
                    <th className={styles.tHead}>Image of Product</th>
                </tr>
            </thead>
            <tbody className={styles.tBody}>
                {products?.map((product, index) => (
                    <tr className={styles.tRow} key={product.id}>
                        <td>
                            {index+1}
                        </td>
                        <td>
                            {product.name}
                        </td>
                        <td>
                            {product.price}
                        </td>
                        <td>
                            <Image
                            src={product.image_url}
                            width={50}
                            height={50}
                            alt={`${product.name}'s image`} />
                        </td>
                        <td><UpdateProduct id={product.id} /></td>
                        <td><DeleteProduct id={product.id} /></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}