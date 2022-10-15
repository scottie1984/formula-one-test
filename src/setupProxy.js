const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://v1.formula-1.api-sports.io/",
      pathRewrite: { "^/api": "" },
      changeOrigin: true,
      headers: {
        "x-rapidapi-key": process.env.API_KEY,
        "x-rapidapi-host": "v1.formula-1.api-sports.io",
      },
    })
  );
};
