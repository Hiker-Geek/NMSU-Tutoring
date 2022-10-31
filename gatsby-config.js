module.exports = {
  siteMetadata: {
    title: "My First Gatsby Site",
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-pg",
      options: {
        connectionString: "postgres://postgres:scarythings@localhost:5432",
        schema: "public",
        refetchInterval: 60
      }
    }
  ],
}
