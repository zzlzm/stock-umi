import { IStockModal } from '../config/stock.type';
import * as API from '../services/stock.service';

const defaultState: IStockModal = {
    stocks: [],
};

export default {
    namespace: 'stock',
    state: { ...defaultState },
    effects: {
        *getStocks({ payload }, { call, put }) {
            try {
                const { data } = yield call(API.getStock, payload);
                const stockCodes = payload.list.split(',');
                const stockDatas = data.split(';');
                const stocks = stockCodes.map((stockCode, idx) => {
                    const [
                        name,
                        todayStart,
                        lastEnd,
                        current,
                        high,
                        low,
                    ] = stockDatas[idx].split(',');
                    return {
                        name: name.split('"')[1],
                        todayStart,
                        lastEnd,
                        current,
                        high,
                        low,
                    };
                });
                yield put({
                    type: 'updateState',
                    payload: {
                        stocks,
                    },
                });
            } catch (e) {
                console.error(e);
            }
        },
    },
    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
};
