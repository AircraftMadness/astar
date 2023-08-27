export type Heuristic = "Manhatten" | "Manhattan" | "Euclidean" | "Chebyshev" | "Octile";

export type AStarFinderConstructor = {
	grid: GridConstructor;
	diagonalAllowed?: boolean;
	heuristic?: Heuristic;
	weight?: number;
	includeStartNode?: boolean;
	includeEndNode?: boolean;
	allowPathAsCloseAsPossible?: boolean;
};

export type GridConstructor = (
	| {
			width: number;
			height: number;
			matrix: undefined;
	  }
	| {
			matrix: (0 | 1)[][];
			width: undefined;
			height: undefined;
	  }
) & { densityOfObstacles?: number };

export type NodeConstructor = {
	id: number;
	position: Point;
	walkable?: boolean;
};

export type Point = {
	x: number;
	y: number;
};
