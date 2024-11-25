'use strict';

const node_path = require('node:path');
const process = require('node:process');
const node_module = require('node:module');
const vitepress = require('vitepress');
const debug = require('debug');
const hash = require('hash-sum');
const vuepressPluginExportPdfCore = require('@condorhero/vuepress-plugin-export-pdf-core');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;

function _interopDefaultCompat(e) {
  return e && typeof e === 'object' && 'default' in e ? e.default : e;
}

const process__default = /*#__PURE__*/ _interopDefaultCompat(process);
const debug__default = /*#__PURE__*/ _interopDefaultCompat(debug);
const hash__default = /*#__PURE__*/ _interopDefaultCompat(hash);

const engines = {
  node: ">=18"
};
const peerDependencies = {
  vitepress: ">=1.0.0-alpha.35"
};

const devDebug = debug__default("vitepress-export-pdf:dev-server");
const PORT = 16762;
const HOST = "localhost";
const moduleRequire = node_module.createRequire((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.src || new URL('shared/vitepress-export-pdf.a0128f3c.cjs', document.baseURI).href)));
const {
  version
} = moduleRequire("vitepress/package.json");
async function serverApp(dir = "docs", commandOptions = {}) {
  vuepressPluginExportPdfCore.checkEnv("VitePress", engines.node, version, peerDependencies.vitepress);
  const sourceDir = node_path.join(process__default.cwd(), dir);
  if (commandOptions.debug)
    debug__default.enabled("vitepress-export-pdf:*");
  devDebug("sourceDir: %s", sourceDir);
  let userConfig = {};
  const userConfigPath = commandOptions.config ? vuepressPluginExportPdfCore.resolveUserConfigPath(commandOptions.config) : vuepressPluginExportPdfCore.resolveUserConfigConventionalPath(sourceDir, "vitepress");
  if (userConfigPath)
    userConfig = await vuepressPluginExportPdfCore.loadModule(userConfigPath);
  if (Array.isArray(userConfig.routePatterns))
    userConfig.routePatterns = ["/**", "!/404.html", ...userConfig.routePatterns];
  else
    userConfig.routePatterns = ["/**", "!/404.html"];
  const vitepressOutFile = commandOptions.outFile ?? `vitepress-${vuepressPluginExportPdfCore.timeTransformer()}.pdf`;
  const vitepressOutDir = commandOptions.outDir ?? ".";
  devDebug("userConfig: %O", userConfig);
  const {
    sorter,
    puppeteerLaunchOptions,
    pdfOptions,
    routePatterns,
    outFile = vitepressOutFile,
    outDir = vitepressOutDir,
    urlOrigin = commandOptions.urlOrigin,
    pdfOutlines = commandOptions.pdfOutlines,
    outlineContainerSelector = ".VPContent"
  } = userConfig;
  const devServer = await vitepress.createServer(sourceDir, {
    port: PORT,
    host: HOST
  });
  const {
    port = PORT, host = HOST
  } = devServer.config.server;
  const devApp = await devServer.listen(port);
  devApp.printUrls();
  process__default.stdout.write("\n");
  process__default.stdout.write("Start to generate current site to PDF ...");
  const {
    pages,
    tempDir,
    cleanUrls
  } = await vitepress.resolveConfig(devApp.config.root);
  const haveCleanUrls = cleanUrls ? "" : ".html";
  const hashPages = pages.map((page) => ({
    path: `${devServer.config.base}${page.replace(/\.md$/, haveCleanUrls)}?export=1`,
    key: `v-${hash__default(page)}`
  }));
  try {
    await vuepressPluginExportPdfCore.generatePdf({
      pages: hashPages,
      tempDir,
      host: typeof host === "boolean" ? HOST : host,
      port,
      outFile,
      outDir,
      sorter,
      urlOrigin,
      pdfOptions,
      pdfOutlines,
      routePatterns,
      puppeteerLaunchOptions,
      outlineContainerSelector
    });
  } catch (error) {
    console.error(error);
  }
  await devApp.close();
  process__default.exit(0);
}

exports.HOST = HOST;
exports.PORT = PORT;
exports.moduleRequire = moduleRequire;
exports.serverApp = serverApp;