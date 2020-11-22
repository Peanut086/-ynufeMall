// 设置路径别名
/*module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'assets': 'src/assets',
				'common': 'src/common',
				'components': 'src/components',
				'network': 'src/network',
				'views': 'src/views',
			}
		}
	}
}*/

const path = require("path");
function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	chainWebpack: config => {
		config.resolve.alias
		.set("@", resolve("src"))
		.set("assets", resolve("src/assets"))
		.set("components", resolve("src/components"))
		.set("views", resolve("src/views"))
		.set("network", resolve("src/network"))
		// .set("base", resolve("baseConfig"))
		// .set("public", resolve("public"));
	},
	// 关闭ESLint
	lintOnSave: false
}