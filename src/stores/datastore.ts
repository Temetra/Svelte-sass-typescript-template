import { writable } from "svelte/store";

function squareNumber(input: number):number{
	return input * input;
}

export const count = writable(squareNumber(0));