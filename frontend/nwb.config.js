module.exports = {
  type: 'preact-app',
  webpack: {
    define: {
      __APPNAME__: JSON.stringify('medium-blog'),
      __API__: JSON.stringify('//localhost:5000')
    }
  },
}
