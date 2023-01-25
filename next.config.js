/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	compiler: {
		styledComponents: true,
	},
	images: {
		domains: [
			'images.unsplash.com',
			'www.random.imagecdn.app',
			'www.freepngimg.com',
			'www.nicepng.com',
			'pngimg.com',
			'w7.pngwing.com',
		],
	},
};

module.exports = nextConfig;
