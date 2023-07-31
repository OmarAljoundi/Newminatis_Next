/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.8,
  exclude: [
    "/server-sitemap.xml",
    "/payment",
    "/order_confirmation",
    "/checkout",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "black-listed-bot",
        disallow: ["/payment", "/order_confirmation", "/checkout"],
      },
    ],
    additionalSitemaps: [process.env.SITE_URL + "/server-sitemap.xml"],
  },
};
