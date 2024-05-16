import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./component/header";

const inter = Inter({ subsets: ["latin"] });
<link rel="icon" href="./public/logo.ico" sizes="any" />;
export const metadata: Metadata = {
    title: "Trang chủ",
    description: "Trang web xem mọi phim trực tuyến free không quảng cáo",
    icons: "logo.ico",
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={inter.className}
                style={{ backgroundColor: "#09090b" }}>
                <Header />

                <div className="text-white ">{children}</div>
            </body>
        </html>
    );
}
