/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.8,
  exclude: ["/server-sitemap.xml"], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      process.env.SITE_URL + "/server-sitemap.xml", // <==== Add here
    ],
  },
};
