# Jest tests api study v1.0.1

yarn add jest -D

yarn run test -> “jest”

Watch changes: “jest —watch” // get the watch mode and always run test in changes

Create snapshots:
	toMatchSnapshots (lists, results expected of tests):
		- it creates a snapshots folder which will contain the file which is being tested with the result
		- if you add something new to the array or result, you should run yarn run jest -- -u

	toMatchInlineSnapshot:
		- different from the toMatchSnapshot, it doesn’t create a file with the result, it creates the result inline, in the test file.

Options:
- findRelatedTests - find tests related on the lint staged files (used with lint-staged and husky pre commit configs)
- passWithNoTests - do not throw error when there is no tests related (used with findRelatedTests)
