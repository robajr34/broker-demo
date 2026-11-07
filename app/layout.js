import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "EthioDelala | Ethiopian Real Estate & Vehicle Brokerage",
  description: "Verified luxury villas, modern apartments, commercial buildings, prime land plots, and premium vehicles directly with your trusted licensed broker in Ethiopia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-100 selection:text-amber-900 antialiased font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
