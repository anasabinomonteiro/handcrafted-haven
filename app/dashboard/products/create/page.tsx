import Link from "next/link";
import Image from "next/image";
import styles from "@ui/dashboard/dashboard.module.css"
import categoriesStyles from "@ui/categories.module.css";
import { getCategories } from "@lib/data";
import type { Category } from "@lib/types";

export default async function Page() {
  //dynamically fetch categories from the database
  const categories = (await getCategories()) as Category[];
  
  return (
    <div className={styles.dashboardPageContainer}>
      <div className={styles.dashboardMiniContainer}>
        <h1>Create a Product</h1>
        <h4>Choose a product category</h4>

        <div className={categoriesStyles.categoryLinksDiv}>
          {categories.map((category) => (
            <Link key={category.id} className={categoriesStyles.categoryLink} href={`/dashboard/products/create/${category.id}`}>
              <Image className={categoriesStyles.categoryLinkImages} src={category.image_url} alt={`${category.name} category`} width={100} height={100} />
              {category.name}
              </Link>
          ))}
        </div>
      </div>
    </div>
  );
}