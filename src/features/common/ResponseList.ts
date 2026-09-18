
export const DEFAULT_PAGINATION = {
    totalPages: 0,
    total: 0,
    currentPage: 1,
    limit: 10
}

export interface Pagination {
    totalPages?: number;
    total?: number;
    currentPage?: number;
    page?: number;
    limit?: number;
}

export interface ResponseList<T> {
    pagination: Pagination;
    data: T[];
}
