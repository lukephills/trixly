
    var testsContext = require.context("../../test/node-tests", false);

    var runnable = testsContext.keys();

    runnable.forEach(testsContext);
    