//import AcmeLogo from '@/app/ui/acme-logo';
//import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
//import { lusitana } from "@/app/ui/fonts";
import Image from 'next/image';

export default function Page() {
  return (
    <main>
      <h1>Welcome to Handcrafted-Haven!</h1>
      <p>Your one-stop destination for unique, handcrafted products made with love and care.</p>
      <Image src="" alt="Handcrafted Products" width={600} height={400} />
      <p>Discover a world of artisanal treasures, from handmade jewelry to custom home decor. Each item is crafted by skilled artisans who pour their heart into every creation.</p>
      <p>Whether you're looking for a special gift or a treat for yourself, Handcrafted-Haven has something for everyone. Explore our curated collections and support independent makers today!</p>
      <button>
        <Link href="/products">
        Explore Our Products
      </Link>
      </button>
      
    </main>
  );
}
