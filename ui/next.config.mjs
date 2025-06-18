/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '/**', // Allows all paths within this domain
            },
        ],
    },
};

export default nextConfig;
