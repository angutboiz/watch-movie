import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./component/header";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
    title: "Phim Mới | Phim HD | Xem phim nhanh | Phim VietSub | Thuyết Minh Hay Nhất",
    description: "Trang web xem mọi phim trực tuyến free không quảng cáo",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
                <meta name="google-site-verification" content="CHsqH1AurGSgE3fcLmEYeeawL8BLrJSOQEsHSzcYpZ0" />
                <meta httpEquiv="content-language" content="vi" /> <meta content="width=device-width, initial-scale=1.0, user-scalable=yes" name="viewport" />
                <meta
                    name="keywords"
                    content="Phim Trung Quốc, Phim Hàn Quốc, Phim chiếu rạp, Phim hành động, Phim kinh di, Phim hài, Phim hoạt hình, Phim Mỹ, Phim Võ Thuật, Phim bộ hay nhất, Xem phim Online"
                />{" "}
                <meta name="description" content="Phim Mới chất lượng cao miễn phí. Xem phim hd VietSub. Phim thuyết minh chất lượng HD. Kho phi mới chuẩn nhanh online hay hấp dẫn." />{" "}
                <meta name="ROBOTS" content="index,follow" /> <meta name="googlebot" content="index,follow" />
                <meta name="BingBOT" content="index,follow" /> <meta name="yahooBOT" content="index,follow" /> <meta name="slurp" content="index,follow" />{" "}
                <meta name="msnbot" content="index,follow" /> <meta name="theme-color" content="#ff8a00" /> <meta property="og:site_name" content="CaPhim" />
                <meta property="og:locale" content="vi_VN" /> <meta property="og:title" content="Phim Mới | Phim HD | Xem phim nhanh | Phim VietSub | Thuyết Minh Hay Nhất" />
                <meta property="og:description" content="Phim Mới chất lượng cao miễn phí. Xem phim hd VietSub. Phim thuyết minh chất lượng HD. Kho phim mới chuẩn nhanh online hay hấp dẫn." />
                <meta property="og:type" content="website" /> <meta property="og:url" content="https://caphim.vercel.app/" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Phim Mới | Phim HD | Xem phim nhanh | Phim VietSub | Thuyết Minh Hay Nhất" />{" "}
                <meta name="twitter:description" content="Phim Mới chất lượng cao miễn phí. Xem phim hd VietSub. Phim thuyết minh chất lượng HD. Kho phim mới chuẩn nhanh online hay hấp dẫn." />
                <meta name="revisit-after" content="1 days" />
            </head>
            <body className={inter.className} style={{ backgroundColor: "#09090b" }}>
                <Header />

                <div className="text-white ">{children}</div>
            </body>
        </html>
    );
}
