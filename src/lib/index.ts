import { writable, get } from 'svelte/store';

export const paginationStore = writable({
	page: 1,
	size: 3
});

export default paginationStore;

paginationStore.subscribe((s) => {
	console.log(s);
});

export const setPage = (pageNumber: number) => {
	const store = get(paginationStore);
	store.page = pageNumber;
	paginationStore.set(store);
}

export const getStore = () => {
	return get(paginationStore);
}