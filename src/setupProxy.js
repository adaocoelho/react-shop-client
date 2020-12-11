/// teste para chamar todos os pedidos da api //

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(createProxyMiddleware("/api", { target: "http://localhost:5000" }));
};

