# tagplusone
Utility to assist with generating incremental git tags.

# Motivation
If you are using a Continuous Integration service such as Codeship and you want to automatically create a new git tag for every build one option is to use the build number provided by the CI server. The drawback is this build number increments every time any of their customers run a build, so it won't be incremental for your specific build job. I created tagplusone so that I can easily generate incremental tags for each of my jobs.

# Prerequisites
* Git must be installed
* The command must be run from within a git working directory

# Installation
```
npm install -g tagplusone
```

# Usage
```
# Purely numerical tags - if the last tag was 100 this will return 101
tagplusone

# Prefix tags e.g. with v, build etc - if the last tag was v100 this will return v101
tagplusone v

# Automtically create a tag
NEXT_TAG = `tagplusone v`
git tag -a $NEXT_TAG -m "Automatically tagged by Codeship"
git push --tags
```

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

