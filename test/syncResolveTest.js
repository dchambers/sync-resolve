import syncResolve from '../src/syncResolve.js';
import expect from 'expectations';

describe('syncResolve', function() {
	it('allows promises to be synchronously resolved', function() {
		const value = syncResolve(() => Promise.resolve(42));
		expect(value).toEqual(42);
	});
});
