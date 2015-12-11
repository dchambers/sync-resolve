# sync-resolve

Sometimes, you know that a promise can be resolved synchronously, and you have a genuine need to resolve it synchronously, but you can't. [Promises/A+](https://promisesaplus.com/) purposely don't allow synchronous resolution of `then` invocations because call-back APIs that may or may not resolve asynchronously lead to bugs for users of such APIs. However, if a piece of code can always be resolved synchronously, and we wrap a synchronous API around it, then we've got an API that's always synchronous, and so there are no problems.

Here's a concrete example from [SystemJS](https://github.com/systemjs/systemjs), where all libraries had been pre-bundled, and so the author knew that it was now safe for any `System.import()` invocations to be resolved synchronously. With _sync-resolve_ we can write synchronous code like this:

~~~es6
const React = syncResolve(() => System.import('react')).default;
~~~

instead of having to write asynchronous code like this:

~~~es6
System.import('react').then((m) => {
	const React = m.default;
});
~~~

We achieve this by using the _synchronous-inspection_ feature of [Bluebird](http://bluebirdjs.com/docs/getting-started.html) together with a forced synchronous-resolution mechanism that we add ourselves.
