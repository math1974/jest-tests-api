const chalk = require('chalk');
const semver = require('semver');
const { engines } = require('./package.json');
const version = engines.node;

if (!semver.satisfies(process.version, version)) {
	throw new Error(chalk.red(`The current node version ${chalk.yellow(process.version)} does not satisfy the required version ${chalk.green(version)}.`));
}
