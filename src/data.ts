import {
  AnchorType,
  Graph,
  Link,
  LinkStrength,
  LinkType,
  Node,
} from "./interfaces";

const node01: Node = {
  id: "node1",
  shape: {
    type: "hexagon",
    scale: 2,
  },
  x: 0,
  y: 0,
//   anchor: {
//     type: AnchorType.Soft,
//     x: -150,
//     y: 0,
//   },
  payload: {
    title: "Hello World",
    color: "teal",
  },
};

const node02: Node = {
  id: "node2",
  shape: {
    type: "hexagon",
    scale: 2,
  },
  x: 150,
  y: 150,
  payload: {
    title: "node 02",
    color: "purple",
  },
};

const node03: Node = {
  id: "node3",
  shape: {
    type: "hexagon",
    scale: 2,
  },
  x: 50,
  y: -100,
  payload: {
    title: "node 02",
    color: "purple",
  },
};

const nodes: Node[] = [node01, node02, node03];

const links: Link[] = [
    {
      source: "node1",
      target: "node2",
      type: LinkType.Dashed,
      directed: true,
      label: "link name",
      strength: LinkStrength.Strong,
    },
    {
      source: "node1",
      target: "node3",
      type: LinkType.Dashed,
      directed: true,
      label: "link name",
      strength: LinkStrength.Strong,
    },
];

export const state: Graph = {
  nodes,
  links,
};
