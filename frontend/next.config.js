/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permite que el dev server haga proxy a la API de Spring Boot
  async rewrites() {
  },
};

module.exports = nextConfig;
