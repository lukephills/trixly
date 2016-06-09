var Greeter = (function () {
    function Greeter(greeting) {
        var _this = this;
        this.greeting = greeting;
        this.greet = function () {
            return '<h1>' + _this.greeting + '</h1>';
        };
    }
    return Greeter;
})();
;
exports["default"] = Greeter;
//# sourceMappingURL=index.js.map