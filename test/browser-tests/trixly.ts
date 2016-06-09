import Trixly from '../../src/index.ts';
import { expect } from 'chai';

describe('Trixly', () => {

    it('should run a simple TypeScript test', () => {
        expect(true).to.be.true;
    });

    it('should be an object', () => {
        expect(Trixly).to.eql({});
    });
});