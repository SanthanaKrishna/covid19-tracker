export const ascSortByNumber = (data, sortBy) => data.sort((a, b) => a[sortBy] - b[sortBy]);

export const decSortByNumber = (data, sortBy) => data.sort((a, b) => b[sortBy] - a[sortBy]);


