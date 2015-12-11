'use strict';

import Promise from 'bluebird';

export default function syncResolve(code) {
	const scheduledFuncs = [];
	const origScheduler = Promise.setScheduler((fn) => scheduledFuncs.push(fn));
	const origPromise = global.Promise;

	try {
		global.Promise = Promise;
		const promise = code();

		for(var fn of scheduledFuncs) {
			fn();
		}

		const value = promise.value();
	}
	finally {
		Promise.setScheduler(origScheduler);
		global.Promise = origPromise;
	}

	return value;
}
