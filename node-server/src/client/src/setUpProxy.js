const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/api/*",
		createProxyMiddleware({
			target: "http://localhost:8002",
			changeOrigin: true,
		})
	);

	app.use(
		"/api/node-server", // 두 번째 백엔드 API 서버에 대한 URL 패턴
		createProxyMiddleware({
			target: "http://localhost:4000",
			changeOrigin: true,
		})
	);
};
