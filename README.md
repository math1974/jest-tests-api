# Jest tests api study v1.0.1

yarn add jest -D

yarn run test -> “jest”

Jest Watch: “jest —watch” // get the watch mode and always run test in changes

Create snapshots:
	toMatchSnapshots (lists, results expected of tests):
		- it creates a snapshots folder which will contain the file which is being tested with the result
		- if you add something new to the array or result, you should run `YARN RUN JEST — -u`

	toMatchInlineSnapshot:
		- different from the toMatchSnapshot, it doesn’t create a file with the result, it creates the result inline, in the test file.
