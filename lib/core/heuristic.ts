/**
 * Resources:
 * http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
 * https://en.wikipedia.org/wiki/Taxicab_geometry
 * https://en.wikipedia.org/wiki/Euclidean_distance
 * https://en.wikipedia.org/wiki/Chebyshev_distance
 * http://www.gameaipro.com/GameAIPro/GameAIPro_Chapter17_Pathfinding_Architecture_Optimizations.pdf
 * https://github.com/riscy/a_star_on_grids#heuristics
 */

import { Point, Heuristic } from "../structures";

/**
 * Calculate for two positions the heuristic function.
 * @param heuristicFunction
 * @param pos0
 * @param pos1
 * @param weight
 */
export function calculateHeuristic(heuristicFunction: Heuristic, pos0: Point, pos1: Point, weight: number): number {
	const dx = math.abs(pos1.x - pos0.x);
	const dy = math.abs(pos1.y - pos0.y);

	switch (heuristicFunction) {
		// TODO: Remove Manhatten in next major release
		case "Manhatten":
		case "Manhattan":
			/**
			 * Calculate the Manhattan distance.
			 * Generally: Overestimates distances because diagonal movement not taken into accout.
			 * Good for a 4-connected grid (diagonal movement not allowed)
			 */
			return (dx + dy) * weight;
		case "Euclidean":
			/**
			 * Calculate the Euclidean distance.
			 * Generally: Underestimates distances, assuming paths can have any angle.
			 * Can be used f.e. when units can move at any angle.
			 */
			return math.sqrt(dx * dx + dy * dy) * weight;
		case "Chebyshev":
			/**
			 * Calculate the Chebyshev distance.
			 * Should be used when diagonal movement is allowed.
			 * D * (dx + dy) + (D2 - 2 * D) * math.min(dx, dy)
			 * D = 1 and D2 = 1
			 * => (dx + dy) - math.min(dx, dy)
			 * This is equivalent to math.max(dx, dy)
			 */
			return math.max(dx, dy) * weight;
		case "Octile":
			/**
			 * Calculate the Octile distance.
			 * Should be used on an 8-connected grid (diagonal movement allowed).
			 * D * (dx + dy) + (D2 - 2 * D) * math.min(dx, dy)
			 * D = 1 and D2 = sqrt(2)
			 * => (dx + dy) - 0.58 * math.min(dx, dy)
			 */
			return (dx + dy - 0.58 * math.min(dx, dy)) * weight;
	}
}
