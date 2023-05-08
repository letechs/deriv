import React from 'react'
const DerivAPI = require('@deriv/deriv-api/dist/DerivAPI');
const connection = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');
const api = new DerivAPI({ connection });
const apiBasic = api.basic

const validate = async (token) => {
    const res = await apiBasic.authorize({
        "authorize": token,
        "req_id": 1
    })
    connection.addEventListener("message", authorizeResponse);
    return res;
}
const authorizeResponse = async (res) => {
    const data = JSON.parse(res.data);
    return data.authorize;
};

const ticks = async (value) => {
    connection.addEventListener("message", ticksResponse);
    const ticks = await api.ticks(value)
    return ticks;
};
const ticksResponse = async (res) => {
    const data = JSON.parse(res.data);
    console.log(data)
    return data;
};
const asset = async () => {
    connection.addEventListener("message", assetResponse);
    const asset = await apiBasic.assetIndex()
    return asset;
};
const assetResponse = async (res) => {
    const data = JSON.parse(res.data);
    return data;
};
const candle = async (value) => {
    connection.addEventListener("message", candleResponse);
    const candle = await api.candles(value)
    return candle;
};
const candleResponse = async (res) => {
    const data = JSON.parse(res.data);
    return data;
};
const proposal = async (value) => {
    connection.addEventListener("message", proposalResponse);
    const token = "B07CZVHI55r19ES"
    const account = api.account(token)
    const contract = await api.contract({
        "proposal": 1,
        "amount": 100,
        "barrier": "+0.1",
        "basis": "payout",
        "contract_type": "CALL",
        "currency": "USD",
        "duration": 10,
        "duration_unit": "t",
        "symbol": "R_100"
      })
      const buy = await contract.buy();
    return contract;
};
const proposalResponse = async (res) => {
    const data = JSON.parse(res.data);
    console.log(data)
    return data;
};




const apiService = {
    validate,
    ticks,
    asset,
    candle,
    proposal
};

export default apiService;