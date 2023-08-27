import { Array } from "@rbxts/sift";

import { backtrace } from "../core/util";
import { calculateHeuristic } from "../core/heuristic";
import { Grid } from "../core/grid";
import { Heuristic, AStarFinderConstructor, Point } from "../structures";
import { Node } from "../core/node";

export class AStarFinder {
	// Grid
	private grid: Grid;

	// Lists
	private closedList: Node[];
	private openList: Node[];

	// Pathway variables
	private allowPathAsCloseAsPossible: boolean;
	readonly diagonalAllowed: boolean;
	private heuristic: Heuristic;
	readonly includeStartNode: boolean;
	readonly includeEndNode: boolean;
	private weight: number;

	constructor(aParams: AStarFinderConstructor) {
		// Create grid
		this.grid = new Grid(aParams.grid);

		// Init lists
		this.closedList = [];
		this.openList = [];

		// Set diagonal boolean
		this.diagonalAllowed = aParams.diagonalAllowed ?? true;

		// Set heuristic function
		this.heuristic = aParams.heuristic ?? "Manhattan";

		// Set if start node included
		this.includeStartNode = aParams.includeStartNode ?? true;

		// Set if end node included
		this.includeEndNode = aParams.includeEndNode ?? true;

		// Default path as close as possible not allowed
		this.allowPathAsCloseAsPossible = aParams.allowPathAsCloseAsPossible ?? false;

		// Set weight
		this.weight = aParams.weight ?? 1;
	}

	public findPath(startPosition: Point, endPosition: Point): number[][] {
		// Reset lists
		this.closedList = [];
		this.openList = [];

		// Reset grid
		this.grid.resetGrid();

		const startNode = this.grid.getNodeAt(startPosition);
		const endNode = this.grid.getNodeAt(endPosition);

		// Break if start and/or end position is/are not walkable
		if (!this.grid.isWalkableAt(endPosition) || !this.grid.isWalkableAt(startPosition)) {
			// Path could not be created because the start and/or end position is/are not walkable.
			return [];
		}

		// Push start node into open list
		startNode.setIsOnOpenList(true);
		this.openList.push(startNode);

		// Loop through the grid
		// Set the FGH values of non walkable nodes to zero and push them on the closed list
		// Set the H value for walkable nodes
		for (let y = 0; y < this.grid.height; y++) {
			for (let x = 0; x < this.grid.width; x++) {
				const node = this.grid.getNodeAt({ x, y });
				if (!this.grid.isWalkableAt({ x, y })) {
					// OK, this node is not walkable
					// Set FGH values to zero
					node.setFGHValuesToZero();
					// Put on closed list
					node.setIsOnClosedList(true);
					this.closedList.push(node);
				} else {
					// OK, this node is walkable
					// Calculate the H value with the corresponding heuristic function
					node.setHValue(calculateHeuristic(this.heuristic, node.position, endNode.position, this.weight));
				}
			}
		}

		// As long the open list is not empty, continue searching a path
		while (this.openList.size() !== 0) {
			// Get node with lowest f value
			const currentNode = this.openList.reduce((storedNode, currentNode) =>
				currentNode.getFValue() < storedNode.getFValue() ? currentNode : storedNode,
			);

			// Move current node from open list to closed list
			currentNode.setIsOnOpenList(false);
			Array.removeValue(this.openList, currentNode);

			currentNode.setIsOnClosedList(true);
			this.closedList.push(currentNode);

			// End of path is reached
			if (currentNode === endNode) {
				return backtrace(endNode, this.includeStartNode, this.includeEndNode);
			}

			// Get neighbors
			const neighbors = this.grid.getSurroundingNodes(currentNode.position, this.diagonalAllowed);

			// Loop through all the neighbors
			for (const neightbor of neighbors) {
				// Continue if node on closed list
				if (neightbor.getIsOnClosedList()) {
					continue;
				}

				// Calculate the g value of the neightbor
				const nextGValue =
					currentNode.getGValue() +
					(neightbor.position.x !== currentNode.position.x || neightbor.position.y! === currentNode.position.y
						? this.weight
						: this.weight * 1.41421);

				// Is the neighbor not on open list OR
				// can it be reached with lower g value from current position
				if (!neightbor.getIsOnOpenList() || nextGValue < neightbor.getGValue()) {
					neightbor.setGValue(nextGValue);
					neightbor.setParent(currentNode);

					if (!neightbor.getIsOnOpenList()) {
						neightbor.setIsOnOpenList(true);
						this.openList.push(neightbor);
					} else {
						// okay this is a better way, so change the parent
						neightbor.setParent(currentNode);
					}
				}
			}
		}

		// At this point the path to the end position could NOT be created

		// Return path as close as possible if enabled
		if (this.allowPathAsCloseAsPossible) {
			return backtrace(this.closedList[this.closedList.size() - 1], this.includeStartNode, false);
		}

		// Return empty path, because could NOT be created
		return [];
	}

	/**
	 * Set the heuristic to be used for pathfinding.
	 * @param newHeuristic
	 */
	public setHeuristic(newHeuristic: Heuristic): void {
		this.heuristic = newHeuristic;
	}

	/**
	 * Set the weight for the heuristic function.
	 * @param newWeight
	 */
	public setWeight(newWeight: number): void {
		this.weight = newWeight;
	}

	/**
	 * Get a copy/clone of the grid.
	 */
	public getGridClone(): Node[][] {
		return this.grid.clone();
	}

	/**
	 * Get the current grid
	 */
	public getGrid(): Grid {
		return this.grid;
	}
}
