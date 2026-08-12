import { writable, get, type Writable } from 'svelte/store';

export type PaginationType = {
	page: number;
	size: number;
	total: number;
};

export type WritablePaginationType = Writable<PaginationType>;

export class paginationStore {
	private static store: WritablePaginationType = writable({
		page: 1,
		size: 5,
		total: 0
	});

	constructor() {}

	public static get() {
		return paginationStore.store;
	}

	public static setPage(pageNumber: number) {
		const store = paginationStore.get();
		const storeData = paginationStore.getPaginationData();
		storeData.page = pageNumber;
		store.set(storeData);
	}

	public static setSize(sizeNumber: number) {
		const store = paginationStore.get();
		const storeData = paginationStore.getPaginationData();
		storeData.size = sizeNumber;
		store.set(storeData);
	}

	public static getCurrentPage() {
		return paginationStore.getPaginationData().page;
	}

	public static setTotal(totalNumber: number) {
		const store = paginationStore.get();
		const storeData = paginationStore.getPaginationData();
		storeData.total = totalNumber;
		store.set(storeData);
	}

	public static getPaginationData() {
		const store = this.get();
		return get(store);
	}
}

export default paginationStore;