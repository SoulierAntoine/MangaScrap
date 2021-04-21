module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	globals: {
		'ts-jest': {
			tsConfig: './conf/tsconfig.test.json'
		},
		transform: {
			'^.+\\.jsx?$': 'babel-jest',
			'^.+\\.tsx?$': 'ts-jest',
		}
	},
	rootDir: '../src'
};
