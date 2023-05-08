import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Manual = () => {
    const [symbols, setSymbols] = useState([])
    const [market, setMarket] = useState([])
    const [ssymbols, setSsymbols] = useState([])
    const [selected, setSelected] = useState("");

    const handleMarketSelectCHange = (event) => {
        const select=(event.target.value);
    setSelected(select)
        const synthetic_symbols = symbols.filter(
            (symbol) => symbol.market === select
        );
        
        return  setSsymbols(synthetic_symbols);
    }

    useEffect(() => {
        setSymbols(() => {
            const getSymbol = localStorage.getItem('symbols');
            const parseSymbol = JSON.parse(getSymbol);
            console.log("manual", parseSymbol)
            return parseSymbol || "";
        })
        setMarket(() => {
            const getSymbol = localStorage.getItem('market');
            const parseSymbol = JSON.parse(getSymbol);
            console.log(parseSymbol)
            return parseSymbol || "";
        })
    }, []);

    return (
        <>
            <div className='text-center manual'>

                <div >
                    <p>Manual Trading Mode</p>
                </div>
                <div className="row">

                    <div className="col-6">
                        <FormControl sx={{ m: 2, minWidth: 200 }} size="small">
                            <InputLabel id="market">Market</InputLabel>
                            <Select
                                value={selected}  
                                defaultValue={selected}                            
                                onChange={handleMarketSelectCHange}
                                labelId="market"
                                id="market"
                                label="market"
                            >
                          
                                {market.map((market) => {
                                    return <MenuItem
                                        key={market.market}
                                        value={market.market}
                                       >
                                        {market.market_display_name}
                                    </MenuItem>;
                                })}                           
                              
                            </Select>
                        </FormControl>
                       
                    </div>
                    <div className="col-6">
                        <FormControl sx={{ m: 2, minWidth: 200 }} size="small">
                            <InputLabel id="symbol">Symbol</InputLabel>
                            <Select
                                labelId="symbol"
                                id="symbol"
                                label="symbol"

                            >
                                {ssymbols.map((symbol) => {
                                    return <MenuItem key={symbol.symbol} value={symbol.symbol}>
                                        {symbol.display_name}
                                    </MenuItem>;
                                })}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <FormControl sx={{ m: 2, minWidth: 200 }} size="small">
                            <InputLabel id="duration-type">Duration Type</InputLabel>
                            <Select
                                labelId="duration-type"
                                id="duration-type"
                                label="duration-type"

                            >
                                <MenuItem value=""> <em>None</em></MenuItem>
                                <MenuItem value={10}>Asians</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='col-6'>
                        <FormControl sx={{ m: 2, minWidth: 200 }} size="small">
                            <InputLabel id="duration">Duration</InputLabel>
                            <Select
                                labelId="duration"
                                id="duration"
                                label="duration"

                            >
                                <MenuItem value=""> <em>None</em></MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="row">
                    <div className='col-4'>
                        <TextField
                            sx={{ m: 2, minWidth: 130 }}
                            size='small'
                            type="number"
                            label='Stake'
                            labelId="stake"
                            id="stake"
                            inputProps={{ min: 0.35, max: 100, step: 0.05 }} />
                    </div>
                    <div className='col-4'>
                        <TextField
                            sx={{ m: 2, minWidth: 130 }}
                            size='small'
                            type="number"
                            label='Take Profit'
                            labelId="take-profit"
                            id="take-profit"
                            inputProps={{ min: 1, max: 100, step: 0.05 }} />
                    </div>
                    <div className='col-4'>
                        <TextField
                            sx={{ m: 2, minWidth: 130 }}
                            size='small'
                            type="number"
                            label='Stop Loss'
                            labelId="stop-loss"
                            id="stop-loss"
                            inputProps={{ min: 1, max: 100, step: 0.05 }} />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-6'>
                        <TextField
                            sx={{ m: 2, minWidth: 200 }}
                            size='small'
                            type="number"
                            label='Factor'
                            labelId="factor"
                            id="factor"
                            inputProps={{ min: 0.35, max: 100, step: 0.05 }} />
                    </div>
                    <div className="col-6">
                        <FormControl sx={{ m: 2, minWidth: 200 }} size="small">
                            <InputLabel id="apply">Apply</InputLabel>
                            <Select
                                labelId="apply"
                                id="apply"
                                label="apply"

                            >
                                <MenuItem value=""> <em>None</em></MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <TextField
                            sx={{ m: 2, minWidth: 200 }}
                            size='small'
                            type="number"
                            label='Max Step'
                            labelId="max-step"
                            id="max-step"

                            inputProps={{ min: 1, step: 1 }} />
                    </div>
                    <div className="col-6">
                        <FormControl sx={{ m: 2, minWidth: 200 }} size="small">
                            <InputLabel id="on-max-step">On Max Step</InputLabel>
                            <Select
                                labelId="on-max-step"
                                id="on-max-step"
                                label="on-max-step"

                            >
                                <MenuItem value=""> <em>None</em></MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <Button variant="contained" sx={{ m: 2, minWidth: 200 }}>Rise</Button>
                    </div>
                    <div className='col-6'>
                        <Button variant="contained" color='error' sx={{ m: 2, minWidth: 200 }}>Fall</Button>
                    </div>
                </div>

            </div >

        </>
    )

}

export default Manual;