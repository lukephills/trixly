class Greeter {
    constructor(public greeting: string) { }
    greet: any (): string {
        return '<h1>' + this.greeting + '</h1>';
    }
};

export default Greeter;