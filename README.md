# AStar-Typescript

[![GitHub Stars](https://img.shields.io/github/stars/digitsensitive/astar-typescript?style=flat-square)](https://github.com/digitsensitive/astar-typescript/stargazers) [![GitHub Forks](https://img.shields.io/github/forks/digitsensitive/astar-typescript?style=flat-square)](https://github.com/digitsensitive/astar-typescript/network/members) [![GitHub Issues](https://img.shields.io/github/issues/digitsensitive/astar-typescript?style=flat-square)](https://github.com/digitsensitive/astar-typescript/issues) [![Current Version](https://img.shields.io/npm/v/astar-typescript?style=flat-square)](https://www.npmjs.com/package/astar-typescript)

<p align="center">
  <img width=100% src="astar_logo.png">
</p>

#### The A-star search algorithm library in TypeScript

AStar-TypeScript is an A-star pathfinding API written in TypeScript to use for your HTML5 games or other browser-based projects.

This library was influenced and inspired by [@qioa - PathFinding.js](https://github.com/qiao/PathFinding.js), [@bgrins - javascript-astar](https://github.com/bgrins/javascript-astar), [@prettymuchbryce - easystarjs](https://github.com/prettymuchbryce/easystarjs) and [@redblobgames](https://www.redblobgames.com/pathfinding/a-star/introduction.html).
## Installation

```sh
npm install @rbxts/astar --save
yarn add @rbxts/astar
```
## Basic Usage

Load grid data:

Using an **array** (hardcoded or from a Tilemap-Editor)

> 0 = walkable
> 1 = not walkable

```ts
let myMatrix = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 1],
	[0, 0, 1, 1, 0, 1, 1, 0],
	[0, 0, 1, 0, 0, 0, 1, 0],
	[0, 0, 0, 0, 0, 0, 1, 0],
	[1, 1, 1, 0, 1, 0, 1, 0],
	[0, 0, 0, 0, 1, 0, 1, 0],
	[0, 0, 1, 0, 0, 0, 0, 0],
];

const aStar = new AStarFinder({
	grid: {
		matrix: myMatrix,
	},
});
```

or randomly generated array **from width and height**

```ts
const aStar = new AStarFinder({
	grid: {
		width: 8,
		height: 8,
	},
});
```

Get the path:

```ts
let startPos = { x: 0, y: 0 };
let goalPos = { x: 4, y: 5 };

let myPathway = aStar.findPath(startPos, goalPos);
```

## Advanced Usage

Additional parameters may be passed to adapt your finder.

### Diagonal movements

If you want to disable `diagonal movements`:

```ts
this.aStarInstance = new AStarFinder({
	grid: {
		width: 8,
		height: 8,
	},
	diagonalAllowed: false,
});
```

### Heuristic function

Set the `heuristic function` (Manhattan, Euclidean, Chebyshev or Octile):

```ts
this.aStarInstance = new AStarFinder({
	grid: {
		width: 8,
		height: 8,
	},
	heuristic: "Manhattan",
});
```

It is possible to adjust the `weight` of the heuristic function.
For example if you use 0, every heuristic function will return zero.
That is how you can turn A* into Dijkstra’s Algorithm.
Depending on the `weight` value you can decide if you prefer speed or accuracy.
The lower the `weight` is, the lower will the heuristic function get, which will
make the A* slower.

```ts
const aStar = new AStarFinder({
	grid: {
		width: 8,
		height: 8,
	},
	weight: 0.7,
});
```

### Start and End Node

Include or Exclude the `start and end node`:

```ts
const aStar = new AStarFinder({
	grid: {
		width: 8,
		height: 8,
	},
	includeStartNode: true,
	includeEndNode: true,
});
```

### Allow path as close as possible

```ts
const aStar = new AStarFinder({
	grid: {
		width: 8,
		height: 8,
	},
	allowPathAsCloseAsPossible: true,
});
```

## License

[MIT License](https://opensource.org/licenses/mit-license.php)

Copyright (c) 2017 - 2023 digitsensitive <digit.sensitivee@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
