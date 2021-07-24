import { walk, parse } from "svelte/compiler";

export function toSvelte(svg: string) {
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
    template: `<!-- svelte-ignore a11y-mouse-events-have-key-events --><svg${svg_attributes} {...$$restProps} on:click on:mouseover on:mouseenter on:mouseleave on:keydown><slot />${svg_children}</svg>`,
  };
}
