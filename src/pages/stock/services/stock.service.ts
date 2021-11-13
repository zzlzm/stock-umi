import request from 'axios';

export async function getStock(params) {
    return await request.get('/rest', { params });
}

export async function getStockList() {
    return await request.get('stock.json');
}
