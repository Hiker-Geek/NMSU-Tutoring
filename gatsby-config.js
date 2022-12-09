module.exports = {
  siteMetadata: {
    title: "My First Gatsby Site",
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-express',
      options: {
        output: 'config/gatsby-express.json',
      }
    }
  ]
}
