# tagplusone
Utility to assist with generating incremental git tags.

**Pre-alpha. Not yet ready for production use.**

## Making Changes
If you wish to fork this repo and make changes you will probably want to install the Gulp task runner. This is used for running tests, linting and building the distribution files (transpiles from ES6 module syntax to ES5 using Babel).
```
npm install -g gulp
```

## Running the Tests
```
gulp test
```

## Linting
```
gulp lint
```

## Building the Files
After you've made some changes:
```
# Run the build
gulp build

# Execute tagplusone
node dist/index.js
```

