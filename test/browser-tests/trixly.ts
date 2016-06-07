import Trixly from '../../src/index';

console.log(Trixly)

describe('Trixly', () => {

    it('should run a simple TypeScript test', () => {
        expect(true).to.be.true;
    });

    it('should be an object', () => {
        expect(Trixly).to.be.a.function;
    });

});