import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useEffect } from 'react';
import { createChart } from 'lightweight-charts';

const App1 = () => {
    const DerivAPI = require('@deriv/deriv-api/dist/DerivAPI');
    const connection = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');
    const api = new DerivAPI({ connection });
    const apiBasic = api.basic
    const token = "B07CZVHI55r19ES";
    if (!token) {
        console.error('Deriv Token environment variable is not set');
        process.exit(1);
    }


    const main = async () => {
        // Returns an abstract ticks object
        const ticks = api.ticks('R_100');

        // Subscribe to updates on the ticks object
        //ticks.onUpdate().subscribe(console.log);

        // Read the last ticks available in the default range
        const ticks_history = ticks.list;

        // Read the last 100 ticks until yesterday
        //const older_history = await ticks.history({ count: 100, end: "latest" });

        // Access to low-level API
        const api_basic = api.basic;

        const account = await api.account(token)
        const active = await apiBasic.activeSymbols({
            active_symbols: "brief",
            product_type: "basic"
        });
        // console.log(active)
        const tickResponse = (res) => {
            const data = JSON.parse(res.data);
            console.log(data);

            if (data.msg_type === "active_symbols") {
                // console.log("active" + data.active_symbols);
            }

            setTimeout(async () => {
                const website_status = await api.websiteStatus();

                const is_website_up = website_status.is_website_up;

                website_status.onUpdate(s => console.log(`Site is ${s.status}`));
                // console.log(website_status)
                //connection.removeEventListener("message", tickResponse, false)
            }, 150);
        };

        const ticks1 = async () => {
            // const older_history = await ticks_history({ count: 100, end: "latest" });
            connection.addEventListener("message", tickResponse);
        };

        const active_symbols_request = {
            // landing_company: "maltainvest", // Uncomment landing_company if you want to retrieve specific symbols.
            active_symbols: "brief",
            product_type: "basic"
        };

        const activeSymbolsResponse = async (res) => {
            const data = JSON.parse(res.data);
        }

        const getActiveSymbols = async () => {
            const active = await apiBasic.activeSymbols(active_symbols_request);
            console.log(active)

        };
        const assetIndexResponse = async (res) => {
            const data = JSON.parse(res.data);
         
           if (data.error !== undefined) {
             console.log("Error : ", data.error?.message);
             connection.removeEventListener("message", assetIndexResponse, false);
             await api.disconnect();
           }
         
           if (data.msg_type === "asset_index") {
             console.log(data);
           }
         }
         
         const getAssetIndex = async () => {
           connection.addEventListener("message", assetIndexResponse);
           await api_basic.assetIndex();
         }
         getAssetIndex()
       
        const chartOptions = { layout: { textColor: 'black', background: { type: 'solid', color: 'white' } } };
        const chart = createChart(document.body, { height: "500", textColor: 'black', background: { type: 'solid', color: 'white' } });

        const areaSeries = chart.addAreaSeries({
            lineColor: '#2962FF', topColor: '#2962FF',
            bottomColor: 'rgba(41, 98, 255, 0.28)',
        });
    }




    main()

    return (
        <>
            <div>

            </div>

        </>
    )
}
export default App1;