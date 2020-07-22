export const listToMap = (arr, key = '_id') => arr.reduce((acc, curr) => { acc[curr[key]] = curr; return acc }, {})
