export type Comparators<T> = (current: T, value: T) => 1|0|-1;

export const MyComparator = <T extends string|number>(current: T , value: T ): -1|0|1 => {
    if(current < value) return 1;
    if(current > value) return -1;
    return 0;
}