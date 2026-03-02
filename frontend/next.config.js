/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permite que el dev server haga proxy a la API de Spring Boot
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
