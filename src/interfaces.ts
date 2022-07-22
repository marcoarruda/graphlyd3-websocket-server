export interface IUser {
  id: string;
  color: string;
}

export interface D3Node {
  id: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}
export interface Graph {
  nodes: Node[];
  links: Link[];
}
export interface D3Link {
  source: string | Node;
  target: string | Node;
  index?: number;
  i?: number;
}
export enum LinkType {
  Solid = "solid",
  Dashed = "dashed",
  Dotted = "dotted",
  Hidden = "hidden",
}
export enum LinkStrength {
  Strong = "strong",
  Weak = "weak",
  Loose = "loose",
}
export interface Link extends D3Link {
  type?: LinkType;
  directed?: boolean;
  label?: string;
  strength?: number | LinkStrength;
  padding?: number;
}
export interface Template {
  shapeSize: number;
  shapeBuilder: (data: Node, TemplateAPI: any) => any;
}
export interface Spawn {
  source: string | Node;
  angle: number;
  distance: number;
}
export enum AnchorType {
  Soft = "soft",
  Hard = "hard",
}
export interface Satellite {
  x?: number;
  y?: number;
  source: string | Node;
  angle: number;
  distance: number;
}
export interface Node extends D3Node {
  shape: Shape;
  forceSimulation?: any;
  gravity?: number;
  spawn?: Spawn;
  anchor?: Anchor;
  satellite?: Satellite;
  errorMessage?: string;
  payload?: any;
}

export interface D3Node {
  id: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}
export interface Shape {
  type: string;
  scale: number;
  url?: string;
  template?: Template;
  failed?: boolean;
}
export interface Anchor {
  type: AnchorType;
  x: number;
  y: number;
}
