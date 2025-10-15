//import AcmeLogo from '@/app/ui/acme-logo';
//import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
//import { lusitana } from "@/app/ui/fonts";
import Image from 'next/image';
import styles from './home.module.css';

export default function Page() {
  return (
    <main className={styles.main}>

      <h1 className={styles.title}>Welcome to Handcrafted-Haven!</h1>

      <p className={styles.description}>Your one-stop destination for unique, handcrafted products made with love and care.</p>
      <Image src="/images/handcrafted-products.png" alt="Handcrafted Products" width={1024} height={1024} quality={75} sizes="(max-width: 768px) 100vw, 500px" className={styles.image} />
      <p>Discover a world of artisanal treasures, from handmade jewelry to custom home decor. Each item is crafted by skilled artisans who pour their heart into every creation.</p>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <p className={styles.description}>Whether you're looking for a special gift or a treat for yourself, Handcrafted-Haven has something for everyone. Explore our curated collections and support independent makers today!</p>
      {/* <button> */}
      <Link href="/products" className={styles.exploreButton}>
        Explore Our Products
      </Link>
      {/* </button> */}

    </main>
  );
}
