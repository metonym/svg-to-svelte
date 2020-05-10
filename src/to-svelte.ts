import { parse } from "svg-parser";
import * as visit from "unist-util-visit";
import { mapProps } from "./utils";

export function toSvelte(svg: string, options: { slot?: boolean } = {}) {
  const svg_props = [
    "{...$$restProps}",
    "on:click",
    "on:mouseover",
    "on:mouseenter",
    "on:mouseleave",
    "on:keydown",
  ];
  const svg_children: string[] = [];

  if (options.slot) {
    svg_children.push("<slot />");
  }

  // @ts-ignore
  visit(parse(svg), (node) => {
    if (node.type === "element") {
      if (node.tagName === "svg") {
        mapProps(node.properties)
          .split(" ")
          .forEach((prop) => {
            if (prop.startsWith("class=")) {
              svg_props.push(prop);
            } else {
              svg_props.unshift(prop);
            }
          });
      } else {
        svg_children.push(`<${node.tagName} ${mapProps(node.properties)} />`);
      }
    }
  });

  return {
    props: svg_props,
    children: svg_children,
    template: `<svg ${svg_props.join(" ")}>${svg_children.join("")}</svg>`,
  };
}
