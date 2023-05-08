import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, Grid, ListSubheader } from '@mui/material';

const Auto = () => {

    return (
        <>
           <div className='text-center'>
            <h3 className='text-center'>Auto Trading</h3>
           <div className="row justify-content-center">
                <div className='col-6'>
                    <TextField
                    sx={{ m: 2, minWidth: 200 }}
                        size='small'
                        type="number"
                        label='Stake'
                        inputProps={{ min: 0.35, max: 100, step: 1 }} />
                </div>
                <div className='col-6'>
                    <TextField
                    sx={{ m: 2, minWidth: 200 }}
                        size='small'
                        type="number"
                        label='Take Profit'
                        inputProps={{ min: 1, max: 100, step: 1 }} />
                </div>
           </div>
           <div className="row justify-content-center">
                <div className='col-6'>
                    <TextField
                    sx={{ m: 2, minWidth: 200 }}
                        size='small'
                        type="number"
                        label='Stake'
                        inputProps={{ min: 0.35, max: 100, step: 1 }} />
                </div>
                <div className="col-6">
                    <FormControl sx={{ m: 2, minWidth: 200 }} size="small">
                        <InputLabel id="demo-select-small">Trade Types</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            label="Duration Type"

                        >
                            <MenuItem value=""> <em>None</em></MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <Button variant="contained" sx={{ m: 2, minWidth: 200 }}>Play</Button>
                    </div>
                    <div className='col-6'>
                        <Button variant="contained" color='error' sx={{ m: 2, minWidth: 200 }}>Stop</Button>
                    </div>
                </div>                        
           </div>
           </div>
            
        </>
    )

}

export default Auto;