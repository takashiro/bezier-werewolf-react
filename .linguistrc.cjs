/**
 * @type {import('@karuta/linguist').Config}
 */
module.exports = {
	locales: [
		'en-US',
		'zh-Hans',
	],
	overrideIdFn: '[sha512:contenthash:base64:6]',
};
