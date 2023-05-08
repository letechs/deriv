import React from 'react'
import DerivAPIBasic from "@deriv/deriv-api/dist/DerivAPIBasic";
import { useState, useEffect, useRef } from "react";
import Manual from './components/Manual';
export const Test1 = () => {
    const DerivAPI = require('@deriv/deriv-api/dist/DerivAPI');
    const connection = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');
    const token = "B07CZVHI55r19ES";
    const api = new DerivAPI({ connection });
    const apiBasic = api.basic

    const [symbols, setSymbols] = useState([]);
    const [ticks, setTicks] = useState([]);
    const [loading_symbol, setLoadingSymbol] = useState(true);
    const [loading_ticks, setLoadingTicks] = useState(false);
    const [market, setMarket] = useState([]);
    const [selected, setSelected] = useState("");
    const [ssymbols, setSsymbols] = useState([]);
    const [assets, setAssets] = useState([]);
    const [asset, setAsset] = useState([]);
    const [assetList, setAssetList] = useState([]);
    const tick_subscription = useRef();

    const cleanUp = async () => {
        try {
            if (tick_subscription.current) {
                await tick_subscription.current.unsubscribe();
                setTicks([]);
            }

        } catch (e) {

        }
    };
    const handleMarketSelectCHange = (eve) => {
        setSelected(eve.target.value);
    }

    const handleSymbolSubscription = () => {
        localStorage.setItem('symbols', JSON.stringify(symbols))
        localStorage.setItem('market', JSON.stringify(market))
        const synthetic_symbols = symbols.filter(
            (symbol) => symbol.market === selected
        );
        setSsymbols(synthetic_symbols);
    }
    const handleSelectChange = async (e) => {
        setLoadingTicks(true);
        try {
            const {
                target: { value }
            } = e;
            await cleanUp();
            const ass = assets.filter((symbol) => symbol[0] === value)
            setAsset(ass[0][2])
            const res = ass[0][2].map(a => a[0])
            const obj = Object.assign({}, ass)
            console.log(obj)
            setAssetList(res);
            const ticks = apiBasic.subscribe({ ticks: value });
            tick_subscription.current = ticks.subscribe(handleTickSubscription);
        } catch (e) {
            setLoadingTicks(false);
        }
    };
    // console.log(assets)
    const handleTickSubscription = (tick) => {
        setLoadingTicks((loading) => loading && false);
        setTicks((ticks) => {
            if (ticks.length < 10) {
                return [...ticks, tick.tick];
            } else {
                const filtered = ticks.filter((_, i) => i !== ticks.length - 1);
                return [tick.tick, ...filtered];
            }
        });
    };

    const assetIndexResponse = async (res) => {
        const data = JSON.parse(res.data);
        if (data.error !== undefined) {
            console.log("Error : ", data.error?.message);
            connection.removeEventListener("message", assetIndexResponse, false);
            await api.disconnect();
        }

        if (data.msg_type === "asset_index") {
            setAssets(data.asset_index)
        }
    }

    const getAssetIndex = async () => {
        connection.addEventListener("message", assetIndexResponse);
        await apiBasic.assetIndex();
    }

    useEffect(() => {

        apiBasic.activeSymbols("brief").then((response) => {
           if (response.error) {
                setLoadingSymbol(false);
                return;
            }
            setSymbols(response.active_symbols);
            setLoadingSymbol(false);

            const markets = response.active_symbols.reduce((acc, cur) => {
                if (!acc.find((symbol) => symbol.market === cur.market)) {
                    acc.push(cur);
                }
                return acc;
            }, []);
            setMarket(markets)
        });
        getAssetIndex()

        return async () => {
            if (tick_subscription.current) {
                try {
                    await tick_subscription.current.unsubscribe();
                } catch (e) {
                    // TODO: add error handling here
                }
            }
            setTicks([]);
            setSymbols([]);
            setLoadingSymbol(true);
            setLoadingTicks(false);
            tick_subscription.current = null;
        };
    }, []);

    return (
        <div className="App">
            <h1>Deriv Interview Question</h1>

            <select name={selected} onChange={handleMarketSelectCHange} onClick={handleSymbolSubscription}>
                <option value="">Select Market</option>
                {market.map((market) => (
                    <option key={market.market} value={market.market}>
                        {market.market_display_name}
                    </option>
                ))}
            </select>
            {loading_symbol ? (
                <span>Loading symbols...</span>
            ) : (
                <select onChange={handleSelectChange}>
                    <option value="">Select symbol</option>
                    {ssymbols.map((symbol) => (
                        <option key={symbol.symbol} value={symbol.symbol}>
                            {symbol.display_name}
                        </option>
                    ))}
                </select>

            )}
            <select>
                <option value="">Select symbol</option>
                {assetList.map((symbol, index) => (
                    <option key={symbol} value={symbol}>
                        {symbol}
                    </option>
                ))}
            </select>

            {
                loading_ticks ? (
                    <p>Loading ticks...</p>
                ) : (
                    <div>
                        {ticks.map((tick) => (
                            <p key={tick.epoch}>{tick.quote}</p>
                        ))}
                    </div>
                )
            }

        </div>
    );
}


export default Test1;