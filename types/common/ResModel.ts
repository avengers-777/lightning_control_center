export interface ResModel<T> {
    code: number ;
    msg: string ;
    data?: T;
    count?: number | null;

}