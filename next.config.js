const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");

const webpackConfig = {
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.plugins = config.plugins || [];
      config.plugins.push(new webpack.IgnorePlugin(/events-api/));
    }

    return config;
  },
};

const bundleAnalyzerConfig = {
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    browser: {
      analyzerMode: "static",
      reportFilename: "../bundles/client.html",
    },
    server: {
      analyzerMode: "static",
      reportFilename: "../bundles/server.html",
    },
  },
};

module.exports = withTypescript(
  withCSS(
    withBundleAnalyzer({
      ...bundleAnalyzerConfig,
      ...webpackConfig,
    })
  )
);
