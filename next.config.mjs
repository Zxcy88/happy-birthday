/** @type {import('next').NextConfig} */
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const onActions = Boolean(process.env.GITHUB_ACTIONS);
const userSite = repoName.endsWith(".github.io");
const basePath = onActions && repoName && !userSite ? `/${repoName}` : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Read by asset() so media paths survive being served from a subfolder.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
      }
    : {}),
};

export default nextConfig;
