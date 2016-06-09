try {
    window.require = window.top.require;
    window.process = window.top.process;
    window.__dirname = window.top.__dirname;
    require('module').globalPaths.push('./node_modules');
} catch (e) {}

// Ensure all files in src folder are loaded for proper code coverage analysis
const srcContext = require.context('../src', true, /^(?!.*index\.ts(x?)$).*\.ts(x?)$/);
srcContext.keys().forEach(srcContext);

const testsContext = require.context('../test', true, /.*\.ts(x?)$/);
testsContext.keys().forEach(testsContext);