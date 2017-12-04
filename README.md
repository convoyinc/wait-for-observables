# wait-for-observables

[![npm](https://img.shields.io/npm/v/wait-for-observables.svg)](https://www.npmjs.com/package/wait-for-observables)
[![Build Status](https://img.shields.io/circleci/project/github/convoyinc/wait-for-observables/master.svg)](https://circleci.com/gh/convoyinc/workflows/wait-for-observables)

A helper for `await`ing the results of one or more [`Observable`s](https://github.com/tc39/proposal-observable).

This is particularly handy when testing interfaces that return or consume observables.

## Usage

```ts
import waitFor from 'wait-for-observables';

describe(`observable things`, () => {

  it(`observes`, async () => {
    const [result1, result2] = await waitFor(observable1, observable2);
    // …do things with the results.
  });

});
```

An observer that completes successfully will yield `{ values: any[] }`, where `values` is an array containing an entry for each call to `next`.

Observers that fail will yield `{ error: any }`.
