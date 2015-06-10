// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --harmony-classes --harmony-new-target --harmony-reflect

'use strict';

(function TestBasics() {
  var calls = 0;
  class Base {}
  class Derived extends Base {
    constructor(expected) {
      super();
      assertEquals(expected, new.target);
      calls++;
    }
  }
  new Derived(Derived);
  assertEquals(1, calls);

  class Derived2 extends Derived {}
  calls = 0;
  new Derived2(Derived2);
  assertEquals(1, calls);
})();


(function TestFunctionCall() {
  var calls = 0;
  function f(expected) {
    calls++;
    assertEquals(expected, new.target);
  }

  f(undefined);
  assertEquals(1, calls);

  calls = 0;
  f();
  assertEquals(1, calls);

  calls = 0;
  f(undefined, 'extra');
  assertEquals(1, calls);

  calls = 0;
  f.call({}, undefined);
  assertEquals(1, calls);

  calls = 0;
  f.apply({}, [undefined]);
  assertEquals(1, calls);
})();
