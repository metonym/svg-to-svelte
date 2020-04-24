import * as utils from "../utils";
import * as test from "tape";

test("toModuleName", (t) => {
  t.equal(utils.toModuleName("one two  three.svg"), "OneTwoThree");
  t.equal(utils.toModuleName("one--two-three.svg"), "OneTwoThree");
  t.equal(utils.toModuleName("1--two__three.svg"), "_1TwoThree");
  t.end();
});

test("mapProps", (t) => {
  t.equal(utils.mapProps({ x: "1", y: "2", z: "3" }), 'x="1" y="2" z="3"');
  t.end();
});
