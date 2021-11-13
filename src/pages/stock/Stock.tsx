import React, { useEffect, useCallback } from 'react';
import { Table, Button, message } from 'antd';
import { connect, SubscriptionAPI } from 'dva';
import moment from 'moment';

import columns from './config/stock.column';
import styles from './Stock.less';
import * as service from './services/stock.service';

export interface IProps
    extends SubscriptionAPI,
        ReturnType<typeof mapStateToProps> {}

const Stock: React.FC<IProps> = props => {
    const { dispatch } = props;
    const { stocks } = props.stock;
    let interval;

    const start = useCallback(stockList => {
        if (interval) return;
        interval = setInterval(() => {
            dispatch({
                type: 'stock/getStocks',
                payload: {
                    list: stockList.join(','),
                },
            });
        }, 1000);
        message.success('start');
    }, []);

    const stop = useCallback(() => {
        if (!interval) return;
        clearInterval(interval);
        interval = undefined;
        message.success('stop');
    }, []);

    const getStockList = async () => {
        const { data } = await service.getStockList();
        return data;
    };

    useEffect(() => {
        getStockList().then(data => {
            const { stockList } = data;
            start(stockList.map(item => item.code));
            setInterval(() => {
                const now = new Date().getTime() % (24 * 60 * 60 * 1000);
                const milliPerHour = 60 * 60 * 1000;
                const morningStart = 1.5 * milliPerHour;
                const morningEnd = 3.5 * milliPerHour;
                const afternoonStart = 5 * milliPerHour;
                const afternoonEnd = 7 * milliPerHour;
                if (
                    (now > morningStart && now < morningEnd) ||
                    (now > afternoonStart && now < afternoonEnd)
                ) {
                    start(stockList.map(item => item.code));
                } else {
                    stop();
                }
            }, 1 * 60 * 1000);
            message.config({ duration: 1 });
        });
    }, []);
    return (
        <div className={styles.title}>
            <Table
                columns={columns}
                dataSource={stocks}
                pagination={false}
                rowKey={'name'}
                showHeader={false}
            />
            <div className={styles.statusBar}>
                {moment().format('HH:mm:ss')}
                <Button type="link" onClick={start}>
                    开始
                </Button>
                <Button type="link" onClick={stop}>
                    停止
                </Button>
            </div>
        </div>
    );
};

function mapStateToProps({ stock }) {
    return { stock };
}

export default connect(mapStateToProps)(Stock as any);
