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
  function f(expected) {
    assertEquals(expected, new.target);
  }
  f(undefined);
})();


(function TestFunctionConstruct() {
  function f(expected) {
    assertEquals(expected, new.target);
  }
  var o = new f(f);
  assertEquals(o.__proto__, f.prototype);

  function g() {}
  var o = Reflect.construct(f, [g], g);
  assertEquals(o.__proto__, g.prototype);
})();


(function TestDerived() {
  class Base {
    constructor(expected, extra) {
      print(arguments.length);
      print(arguments[0]);
      print(arguments[1]);
      assertEquals(expected, new.target);
    }
  }
  class Derived extends Base {
    constructor(expected) {
      super(expected);
    }
  }

  new Derived(Derived);

})();