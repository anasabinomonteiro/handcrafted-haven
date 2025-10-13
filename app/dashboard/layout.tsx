//import { inter } from "@/app/ui/fonts"
import { Metadata } from "next";
import "@ui/global.css";
import { auth } from "../../auth.config";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user.role !== "seller") return <div>YOU ARE NOT AUTHORISED TO VIEW THIS PAGE</div>;
  if (!session?.user?.id) return null;

  return <>{children}</>;
}
