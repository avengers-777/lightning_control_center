export const MIN_BANDWIDTH_USAGE = 3000;
export const MIN_ENERGY_USAGE = 32000;
const currentDate = new Date();
export const startOfDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    0,
    0,
    0
  );

export  const endOfDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    23,
    59,
    59
  );
  
  export interface Tuple2<T1, T2> {
    t1: T1;
    t2: T2;
  }