/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
      serverComponentsExternalPackages: ['cloudinary', 'graphql-request']
  },
    images:{
        domains:['lh3.googleusercontent.com','res.cloudinary.com', 'task.com']
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true
    }
}

module.exports = nextConfig
