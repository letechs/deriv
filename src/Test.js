import { useEffect, useState } from 'react';
import { createChart } from 'lightweight-charts';
const Test = () => {
    const DerivAPI = require('@deriv/deriv-api/dist/DerivAPI');
    const connection = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');
    const token = "B07CZVHI55r19ES";

    const api = new DerivAPI({ connection });
    const [tickHist, setTickhist] = useState([]);
    const [symbols, setSymbols] = useState([]);
    const accountResponse = async (res) => {
        const data = JSON.parse(res.data);
       // console.log(data)
        if (data.msg_type === "history") {
            setTickhist(data.history)
           
        }
        else if (data.msg_type === "tick") {
            setSymbols(data.tick)
        }
    }
console.log(symbols);
console.log(tickHist)
    const getAccount = async () => {

        connection.addEventListener("message", accountResponse);
        const assets = await api.ticks("R_100");
    };

    getAccount()
    return (
        <>
            <h3> Hello i am Test app</h3>
            <div>
            </div>
        </>
    )
}

export default Test;