import { expect } from 'chai';
import {assert} from 'chai';
import * as sinon from 'sinon';

describe('Trixly - server tests', () => {

    it('works', () => {
        expect(true).to.be.true;
    });

    it('sinon is available', () => {
        assert.ok(sinon.spy);
    });

});

