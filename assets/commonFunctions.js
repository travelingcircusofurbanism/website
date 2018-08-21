exports.capitalize = function (s) {
	if (!s) return ''
	return s.split(' ')
		.map(splitString =>
			splitString.substring(0, 1).toUpperCase() +
			splitString.substring(1)
		)
		.join(' ')
}

exports.softTruncate = function (string, softLimit) {
	if (string.length > softLimit) {
		const afterLimit = string.substring(softLimit)
		let min = 0
		const nextSpace = [
			afterLimit.indexOf(' '),
			afterLimit.indexOf(' '), // ja space
			afterLimit.indexOf(','),
			afterLimit.indexOf('、'),
			afterLimit.indexOf('.'),
			afterLimit.indexOf('。'),
			afterLimit.indexOf('!'),
			afterLimit.indexOf('！'),
			afterLimit.indexOf('?'),
			afterLimit.indexOf('？'),
			afterLimit.indexOf(';'),
			afterLimit.indexOf(':'),
			afterLimit.indexOf('-'),
			afterLimit.length,
		].reduce((min, e) => (e < min && e >= 0) ? e : min) + softLimit
		return string.substring(0, nextSpace) + '...'
	}
	return string
}

exports.log = function (color, ...args) {
	const resetColor = '\x1b[0m'
	const terminalColors = {
		red: '\x1b[31m',
		green: '\x1b[32m',
		yellow: '\x1b[33m',
		blue: '\x1b[34m',
		magenta: '\x1b[35m',
		cyan: '\x1b[36m',
		white: '\x1b[37m',
	}
	console.log((terminalColors[color] || terminalColors.green), ...args, resetColor)
}