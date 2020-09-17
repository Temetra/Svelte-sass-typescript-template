import { writable, derived } from "svelte/store";

// Some Typescript to test the config
function squareNumber(input: number):number {
	return input * input;
}

export const count = writable(0);
export const squaredCount = derived([count], ([count]) => squareNumber(count));