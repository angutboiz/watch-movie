import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./component/header";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
    title: "Phim Mới | Phim HD | Phim VietSub |",
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
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
                <meta name="google-site-verification" content="tfiONyWKY2zp-h4G3Vopnhpb-xdoAttC_29nYNlzD6k" />
                <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
                <meta name="google-site-verification" content="CHsqH1AurGSgE3fcLmEYeeawL8BLrJSOQEsHSzcYpZ0" />
                <meta httpEquiv="content-language" content="vi" /> <meta content="width=device-width, initial-scale=1.0, user-scalable=yes" name="viewport" />
                <meta name="description" content="Phim Mới chất lượng cao miễn phí. Xem phim hd VietSub. Phim thuyết minh chất lượng HD. Kho phi mới chuẩn nhanh online hay hấp dẫn." />{" "}
                <meta property="og:locale" content="vi_VN" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Phim Mới | Phim HD | Phim VietSub |" />
                <meta
                    name="keywords"
                    content="Phim Trung Quốc, Phim Hàn Quốc, Phim chiếu rạp, Phim hành động, Phim kinh di, Phim hài, Phim hoạt hình, Phim Mỹ, Phim Võ Thuật, Phim bộ hay nhất, Xem phim Online, xem phim online tại caphim.vercel.app, caphim, cà phim, caphim, ca phim, xem phim hai tai caphim, doraemon caphim, phimmoi caphim, phim mới tại cà phim, phim chiếu rạp tại cà phim, phim lẻ cà phim, phim le caphim, phim bo ca phim, phim bộ tại cà phim, xem phim nhanh không quảng cáo, xem phim khong quang cao tai caphim"
                />
                <meta
                    property="og:description"
                    content="Phim Mới chất lượng cao miễn phí, không quảng cáo. Xem phim hd VietSub. Phim thuyết minh chất lượng HD. Kho phim mới chuẩn nhanh online hay hấp dẫn tại caphim"
                />
                <meta property="og:url" content="https://caphim.vercel.app/" />
                <meta property="og:site_name" content="Cà Phim - Nền tảng coi phim trực không quảng cáo" />
                <meta property="og:updated_time" content="2024-05-18T09:13:39+07:00" />
                <meta property="og:image" content="https://github.com/angutboiz/watch-movie/blob/main/src/app/thumbnail.jpg?raw=true" />
                <meta property="og:image:width" content="940" />
                <meta property="og:image:height" content="788" />
                <meta property="og:image:alt" content="Cà Phim - Nền tảng coi phim trực không quảng cáo" />
                <meta property="og:image:type" content="image/png" />
                <meta property="article:published_time" content="2024-05-17T09:13:39+07:00" />
            </head>
            <body className={inter.className} style={{ backgroundColor: "#09090b" }}>
                <Header />

                <div className="text-white ">{children}</div>
            </body>
        </html>
    );
}
