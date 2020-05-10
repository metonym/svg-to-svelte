import { parse } from "svg-parser";
import * as visit from "unist-util-visit";
import { mapProps } from "./utils";

export function toSvelte(svg: string) {
  const svg_props = [
    "{...$$restProps}",
    "on:click",
    "on:mouseover",
    "on:mouseenter",
    "on:mouseleave",
    "on:keydown",
  ];
  const svg_children: string[] = [];

  // @ts-ignore
  visit(parse(svg), (node) => {
    if (node.type === "element") {
      if (node.tagName === "svg") {
        svg_props.unshift(mapProps(node.properties));
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
