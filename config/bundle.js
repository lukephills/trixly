// Ensure all files in src folder are loaded for proper code coverage analysis
const srcContext = require.context('../src', true, /.*\.ts$/);
srcContext.keys().forEach(srcContext);

const testsContext = require.context('../test', true, /.*\.ts$/);
testsContext.keys().forEach(testsContext);