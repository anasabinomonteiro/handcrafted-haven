//import { inter } from "@/app/ui/fonts"
import { Metadata } from 'next';
import Footer from './ui/footer';
import Header from './ui/header';
import './ui/global.css';
import { auth } from "../auth.config";
import UserNameDisplay from '@ui/buttons/user-name-display';
import { SessionProvider } from "next-auth/react";
 
export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafted-Haven',
    default: 'Handcrafted-Haven',
  },
  description: 'A website that serves to provide artisans a medium to showcase products.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div className='page-container'>
            <Header />
            <UserNameDisplay />
            {children}
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
