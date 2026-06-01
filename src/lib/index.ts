import { writable, get } from 'svelte/store';

export const test = writable(2);

export default test;

test.subscribe((s) => {
	console.log(s);
});

test.set(6);
console.log(get(test));