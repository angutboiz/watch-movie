import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Cà phim Lite",
        short_name: "Cà phim Lite",
        description: "Xem phim không quảng cáo, nhanh miễn phí tại cà phim (caphim)",
        icons: [
            {
                src: "https://raw.githubusercontent.com/angutboiz/watch-movie/main/src/app/favicon.ico",
                sizes: "192x192",
                type: "image/png",
            },
        ],
        theme_color: "#1A94FF",
        background_color: "#1A94FF",
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
        related_applications: [
            {
                platform: "webapp",
                url: "https://caphim.vercel.app/manifest.json",
            },
        ],
        scope: "/",
    };
}
