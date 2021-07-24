#!/usr/bin/env node

const input = process.argv.slice(2).map((flag) => {
  const [key, value] = flag.split("=");
  if (key === "--input") return value;
})[0];

require("./dist").generate(input);
