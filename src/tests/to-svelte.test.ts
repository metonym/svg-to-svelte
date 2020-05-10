import { toSvelte } from "../to-svelte";
import { strict } from "assert";

const { props, children } = toSvelte(
  `<svg
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg" class="className">
      <path d="M9 11a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9zm1-2h4V7h-4v2zm10 4a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h6zm-5 9h4v-2h-4v2zm-5-9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h6zm-5 9h4v-2H5v2z" fill="#767676" fill-rule="evenodd"/>
    </svg>`,
  { slot: true }
);

strict.equal(
  props.join(""),
  'xmlns="http://www.w3.org/2000/svg"height="24"width="24"{...$$restProps}on:clickon:mouseoveron:mouseenteron:mouseleaveon:keydownclass="className"'
);
strict.equal(
  children.join(""),
  '<slot /><path d="M9 11a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9zm1-2h4V7h-4v2zm10 4a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h6zm-5 9h4v-2h-4v2zm-5-9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h6zm-5 9h4v-2H5v2z" fill="#767676" fill-rule="evenodd" />'
);
