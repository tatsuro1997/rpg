/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.html$/,
      use: "html-loader",
    });

    // bcrypt関連のエラーを回避するために、bcryptのバイナリを除外
    if (!isServer) {
      config.externals = {
        bcrypt: "commonjs bcrypt",
      };
    }

    return config;
  },
};

export default nextConfig;
