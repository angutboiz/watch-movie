module.exports = {
    images: {
        domains: ["phim.nguonc.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*",
            },
            {
                protocol: "http",
                hostname: "*",
            },
        ],
    },
};
