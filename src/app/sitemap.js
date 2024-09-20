const fs = require("fs");
const path = require("path");

async function generateSitemap() {
    const maxPages = 1600; // Số trang muốn fetch

    // Tạo một mảng các promise để fetch dữ liệu song song
    const fetchPromises = [];
    for (let i = 1; i <= maxPages; i++) {
        const fetchPromise = fetch(`https://apii.online/apii/danh-sach/phim-moi-cap-nhat?page=${i}`)
            .then((res) => res.json())
            .then((data) => data.items);
        fetchPromises.push(fetchPromise);
    }

    // Chờ tất cả các request hoàn thành
    const allPosts = await Promise.all(fetchPromises);

    // Nối tất cả các items từ các trang lại với nhau
    const posts = allPosts.flat();

    // Chuyển đổi dữ liệu thành định dạng XML cho sitemap
    const urls = posts
        .map(
            (post) => `
      <url>
        <loc>https://caphim.vercel.app/phim/${post.slug}</loc>
        <lastmod>${new Date(post.modified.time).toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
    `
        )
        .join("");

    // Các URL cố định
    const staticUrls = `
      <url>
        <loc>https://caphim.vercel.app</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://caphim.vercel.app/phimbo</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://caphim.vercel.app/phimle</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://caphim.vercel.app/tvshow</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://caphim.vercel.app/hoathinh</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
    `;

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticUrls}
      ${urls}
    </urlset>`;

    // Đường dẫn đến file sitemap.xml trong thư mục public
    const filePath = path.join(process.cwd(), "public", "sitemap.xml");

    // Ghi file sitemap.xml
    fs.writeFileSync(filePath, sitemap, "utf8");

    console.log(`Sitemap generated and saved to ${filePath}`);
}

generateSitemap();
