import {
  join
} from 'node:path';
import process from 'node:process';
import {
  createRequire
} from 'node:module';
import {
  createServer,
  resolveConfig
} from 'vitepress';
import debug from 'debug';
import hash from 'hash-sum';
import {
  checkEnv,
  resolveUserConfigPath,
  resolveUserConfigConventionalPath,
  loadModule,
  timeTransformer,
  generatePdf
} from '@condorhero/vuepress-plugin-export-pdf-core';

const engines = {
  node: ">=18"
};
const peerDependencies = {
  vitepress: ">=1.0.0-alpha.35"
};

const devDebug = debug("vitepress-export-pdf:dev-server");
const PORT = 16762;
const HOST = "localhost";
const moduleRequire = createRequire(
  import.meta.url);
const {
  version
} = moduleRequire("vitepress/package.json");
async function serverApp(dir = "docs", commandOptions = {}) {
  checkEnv("VitePress", engines.node, version, peerDependencies.vitepress);
  const sourceDir = join(process.cwd(), dir);
  if (commandOptions.debug)
    debug.enabled("vitepress-export-pdf:*");
  devDebug("sourceDir: %s", sourceDir);
  let userConfig = {};
  const userConfigPath = commandOptions.config ? resolveUserConfigPath(commandOptions.config) : resolveUserConfigConventionalPath(sourceDir, "vitepress");
  if (userConfigPath)
    userConfig = await loadModule(userConfigPath);
  if (Array.isArray(userConfig.routePatterns))
    userConfig.routePatterns = ["/**", "!/404.html", ...userConfig.routePatterns];
  else
    userConfig.routePatterns = ["/**", "!/404.html"];
  const vitepressOutFile = commandOptions.outFile ?? `vitepress-${timeTransformer()}.pdf`;
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
  const devServer = await createServer(sourceDir, {
    port: PORT,
    host: HOST
  });
  const {
    port = PORT, host = HOST
  } = devServer.config.server;
  const devApp = await devServer.listen(port);
  devApp.printUrls();
  process.stdout.write("\n");
  process.stdout.write("Start to generate current site to PDF ...");
  const {
    pages,
    tempDir,
    cleanUrls
  } = await resolveConfig(devApp.config.root);
  const haveCleanUrls = cleanUrls ? "" : ".html";
  const hashPages = pages.map((page) => ({
    path: `${devServer.config.base}${page.replace(/\.md$/, haveCleanUrls)}?export=1`,
    key: `v-${hash(page)}`
  }));

  try {
    await generatePdf({
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
  process.exit(0);
}

export {
  HOST as H, PORT as P, moduleRequire as m, serverApp as s
};