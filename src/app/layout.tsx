import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/hooks/use-cart";
const geist = Geist({ subsets: ["latin"],
variable: "--font-sans" });
export const metadata: Metadata = {
  title: "Personal Business Management",
  description: "Modern personal business management system",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      {" "}
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {" "}
        <CartProvider> {children} </CartProvider>{" "}
        <Toaster position="top-right" richColors />{" "}
      </body>{" "}
    </html>
  );
}
