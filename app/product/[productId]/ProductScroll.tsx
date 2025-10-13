// app/product-temporal/[productId]/ProductScroll.tsx 
"use client";
import { useEffect } from 'react';

export default function ProductScroll({ children }: { children: React.ReactNode }) {
  
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#reviews") {
      const el = document.getElementById("reviews");
      
      setTimeout(() => {
        el?.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", window.location.pathname);
      }, 10); 
    }
  }, []);

 
  // const handleScrollToReviews = () => {
  //   const el = document.getElementById("reviews");
  //   el?.scrollIntoView({ behavior: "smooth" });
  //   window.history.replaceState(null, "", "#reviews");
  // };

  return (
    <>
      {children}
    </>
  );
}