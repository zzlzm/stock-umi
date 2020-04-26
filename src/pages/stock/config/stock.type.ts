export interface IStockModal {
    stocks: IStock[];
}

export interface IStock {
    name: string;
    todayStart: number;
    lastEnd: number;
    current: number;
    high: number;
    low: number;
}
