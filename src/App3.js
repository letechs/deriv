import { useEffect, useRef, useState } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App3 = () => {
    const DerivAPI = require('@deriv/deriv-api/dist/DerivAPI');
    const connection = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');
    const api = new DerivAPI({ connection });
    const apiBasic = api.basic

    const [isOpen, setIsOpen] = useState(true)
    const [symbols, setSymbols] = useState([])
    const [market, setMarket] = useState([])
    const tick_subscription = useRef();
    const [ticks, setTicks] = useState([]);

    var token
    const authorize = async (input) => {
        token = input;
        validate()
    }

    const validate = async () => {
        connection.addEventListener("message", authorizeResponse);
        const res = await api.basic.authorize({
            "authorize": token,
            "req_id": 1
        })
        localStorage.setItem('symbols', JSON.stringify(symbols))
        localStorage.setItem('market', JSON.stringify(market))

    }

    const authorizeResponse = async (res) => {
        const data = JSON.parse(res.data);

        if (data.error !== undefined) {
            alert(data.error.message)
        }
        else {
            sessionStorage.setItem("devToken", token)
            alert("App Connecting")
            setIsOpen(!isOpen)

        }
    };
    const cleanUp = async () => {
        try {
            if (tick_subscription.current) {
                await tick_subscription.current.unsubscribe();
                setTicks([]);
            }

        } catch (e) {

        }
    };
    const handleSelectChange = async (e) => {
        try {
            const {
                target: { value }
            } = e;
            await cleanUp();

            const ticks = apiBasic.subscribe({ ticks: value });
            console.log("hi");
            tick_subscription.current = ticks.subscribe(handleTickSubscription);
        } catch (e) {
        }
    };

    const handleTickSubscription = (tick) => {

        setTicks((ticks) => {
            if (ticks.length < 10) {
                return [...ticks, tick.tick];
            } else {
                const filtered = ticks.filter((_, i) => i !== ticks.length - 1);
                return [tick.tick, ...filtered];
            }
        });
    };
    useEffect(() => {
        apiBasic.activeSymbols("brief").then((response) => {
            setSymbols(response.active_symbols);

            const markets = response.active_symbols.reduce((acc, cur) => {
                if (!acc.find((symbol) => symbol.market === cur.market)) {
                    acc.push(cur);
                }
                return acc;
            }, []);
            setMarket(markets)
        });

    }, [])
    /* 
        const main = async () => {
            try {
                const account = await api.account(token);
                // console.log(account)
                //Active Symbols
                const active_symbols_request = {
                    active_symbols: "brief",
                    product_type: "basic"
                };
    
                const activeSymbolsResponse = async (res) => {
                    const data = JSON.parse(res.data);
                    if (data.msg_type === "active_symbols") {
                        // console.log("Active Symbols: " + data.active_symbols);
                    }
                };
    
                const getActiveSymbols = async () => {
                    connection.addEventListener("message", activeSymbolsResponse);
                    await apiBasic.activeSymbols(active_symbols_request);
                };
    
                // Account details
                const accountResponse = async (res) => {
                    const data = JSON.parse(res.data);
    
                    if (data.msg_type === "active_symbols") {
                        //console.log(data.active_symbols);
                    }
                    else if (data.msg_type === "balance") {
                        //console.log(data.balance);
                    }
                    else if (data.msg_type === "authorize") {
                        //console.log(data.authorize);
                    }
                };
    
    
                const getAccount = async () => {
                    connection.addEventListener("message", accountResponse);
                    await api.account(token);
    
                };
    
    
                getAccount()
            }
    
    
            catch (err) {
                console.log(err);
            }
    
        }
    
        main() */

    return (
        <>

            <div>

                {isOpen ?
                    <Home verify={authorize} />
                    :
                    <Dashboard />}
            </div>

        </>
    )
}
export default App3;