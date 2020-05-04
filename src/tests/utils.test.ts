import * as utils from "../utils";
import { strict } from "assert";

strict.equal(utils.toModuleName("one two  three.svg"), "OneTwoThree");
strict.equal(utils.toModuleName("one--two-three.svg"), "OneTwoThree");
strict.equal(utils.toModuleName("1--two__three.svg"), "_1TwoThree");
strict.equal(utils.toModuleName("arrow-90deg-up.svg"), "Arrow90degUp");
strict.equal(utils.mapProps({ x: "1", y: "2", z: "3" }), 'x="1" y="2" z="3"');
