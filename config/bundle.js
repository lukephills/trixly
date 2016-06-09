// Ensure all files in src folder are loaded for proper code coverage analysis
const srcContext = require.context('../src', true, /^(?!.*index\.ts(x?)$).*\.ts(x?)$/);
srcContext.keys().forEach(srcContext);

const testsContext = require.context('../test', true, /.*\.ts(x?)$/);
testsContext.keys().forEach(testsContext);