import Link from "next/link";
import Image from "next/image";
import styles from "@ui/categories.module.css";
import { getCategories, } from "../lib/data";

type Category = {
  id: string;
  name: string;
  image_url: string;
};

export default async function Page() {

  //dynamically fetch categories from the database
  const categories = (await getCategories()) as Category[];
  return (
    <div className={styles.categoryPageContainer}>
      <h1>Categories</h1>
      <p>Explore our diverse range of handcrafted categories, each filled with unique and artisanal products made with love and care.</p>
      <div className={styles.categoryLinksDiv}>
        {categories.map((category) => (
          <Link key={category.id} className={styles.categoryLink} href={`/categories/${category.id}/products`}>
            <Image className={styles.categoryLinkImages} src={category.image_url} alt={`${category.name} category`} width={100} height={100} />
            {category.name}
            </Link>
        ))}
      </div>
    </div>
  );
}