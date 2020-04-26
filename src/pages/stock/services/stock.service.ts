import request from 'axios';

export async function getStock(params) {
    return await request.get('/rest', {params});
}
