import { SortOrder } from '../types';

export const swap = (fieldA: string | number, fieldB: string | number, order?: SortOrder) => {
    const factor = order === SortOrder.DESC ? -1 : 1;

    return fieldA > fieldB ? 1 * factor : -1 * factor;
}