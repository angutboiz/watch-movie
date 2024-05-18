/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || "https://caphim.vercel.app/",
    generateRobotsTxt: true, // (optional)
    // ...other options
};
