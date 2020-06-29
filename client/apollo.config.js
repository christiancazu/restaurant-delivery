module.exports = {
  client: {
    service: {
      name: 'Restaurant Delivery UTP',
      // URL to the GraphQL API
      url: 'http://localhost:3333/graphql'
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js'
    ]
  }
};
