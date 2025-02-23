import averageTree from 'relatives-tree/samples/average-tree.json';
import type { Node } from 'relatives-tree/lib/types';

export const SOURCES = {
  'average-tree.json': averageTree,
} as Readonly<{ [key: string]: readonly Readonly<Node>[] }>;

export const DEFAULT_SOURCE = Object.keys(SOURCES)[0];

export const MAX_SCALE = 2 as const;
export const MIN_SCALE = 0.2 as const;

export const NODE_WIDTH = 240 as const;
export const NODE_HEIGHT = 280 as const;

export const topTags = [
  'Family',
  'Food',
  'Legacy',
  'Memories',
  'Recipes',
  'Ceremonies',
  'Music',
] as const;
