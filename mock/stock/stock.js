function getStock(req, res) {
    res.send(`var hq_str_sz000002="万 科Ａ,27.200,27.350,26.710,27.230,26.680,26.700,26.710,42755647,1149520046.430,30500,26.700,52280,26.690,197318,26.680,126700,26.670,291100,26.660,51300,26.710,25500,26.720,18500,26.730,112200,26.740,41500,26.750,2020-04-15,11:30:00,00";var hq_str_sh600988="赤峰黄金,9.040,9.110,8.990,9.120,8.960,8.980,8.990,42423147,383006747.000,128600,8.980,287100,8.970,361000,8.960,479900,8.950,93000,8.940,99500,8.990,282700,9.000,101800,9.010,119000,9.020,137300,9.030,2020-04-15,11:30:00,00,";`);
    res.end();
}

export default {
    'GET /rest': getStock,
};