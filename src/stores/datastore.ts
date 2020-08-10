// NOTE: Probably a bug - when using livereload, changes to imported 
// .ts files only propagate to importing modules when saved twice

import { writable } from "svelte/store";

function squareNumber(input: number):number{
	return input * input;
}

export const count = writable(squareNumber(0));