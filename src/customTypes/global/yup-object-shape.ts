// TODO: CHECK IF IT WORKS
export type ObjectShapeValues<T> = T extends Record<string, infer V> ? V : never;
export type Shape<T extends Record<any, any>> = Partial<Record<keyof T, ObjectShapeValues<T>>>;
