import { walk, parse } from "svelte/compiler";

export function toSvelte(svg: string, options: { slot?: boolean } = {}) {
  let svg_attributes = "";
  let svg_children = "";

  walk(parse(svg), {
    enter(node: any) {
      if (node.type === "Element" && node.name === "svg") {
        node.children.forEach((child: any) => {
          const { start, end } = child;
          svg_children += svg.slice(start, end);
        });

        node.attributes.forEach((attr: any) => {
          const { name, value } = attr;
          if (name === "class") {
            value[0].raw.split(" ").forEach((name: any) => {
              svg_attributes += ` class:${name}={true}`;
            });
          } else {
            svg_attributes += ` ${name}="${value[0].raw}"`;
          }
        });
      }
    },
  });

  return {
    template: `<svg${svg_attributes} {...$$restProps} on:click on:mouseover on:mouseenter on:mouseleave on:keydown>${svg_children}</svg>`,
  };
}
