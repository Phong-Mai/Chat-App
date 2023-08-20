import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 120,
      },
    },
  };
  return (
    <Box sx={{ minWidth: 300, display: 'flex', margin: 5 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Day</InputLabel>
        <Select
          style={{ margin: 5 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={day}
          label="Day"
          onChange={handleDayChange}
          MenuProps={MenuProps}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={13}>13</MenuItem>
          <MenuItem value={14}>14</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={17}>17</MenuItem>
          <MenuItem value={18}>18</MenuItem>
          <MenuItem value={19}>19</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={21}>21</MenuItem>
          <MenuItem value={22}>22</MenuItem>
          <MenuItem value={23}>23</MenuItem>
          <MenuItem value={24}>24</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={26}>26</MenuItem>
          <MenuItem value={27}>27</MenuItem>
          <MenuItem value={28}>28</MenuItem>
          <MenuItem value={29}>29</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={31}>31</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Month</InputLabel>
        <Select
          style={{ margin: 5 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={month}
          label="Day"
          onChange={handleMonthChange}
          MenuProps={MenuProps}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
          <MenuItem value={12}>12</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          style={{ margin: 5 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={year}
          label="Day"
          onChange={handleYearChange}
          MenuProps={MenuProps}
        >
          <MenuItem value={1980}>1980</MenuItem>
          <MenuItem value={1981}>1981</MenuItem>
          <MenuItem value={1982}>1982</MenuItem>
          <MenuItem value={1983}>1983</MenuItem>
          <MenuItem value={1984}>1984</MenuItem>
          <MenuItem value={1985}>1985</MenuItem>
          <MenuItem value={1986}>1986</MenuItem>
          <MenuItem value={1987}>1987</MenuItem>
          <MenuItem value={1988}>1988</MenuItem>
          <MenuItem value={1989}>1989</MenuItem>
          <MenuItem value={1990}>1990</MenuItem>
          <MenuItem value={1991}>1991</MenuItem>
          <MenuItem value={1992}>1992</MenuItem>
          <MenuItem value={1993}>1993</MenuItem>
          <MenuItem value={1994}>1994</MenuItem>
          <MenuItem value={1995}>1995</MenuItem>
          <MenuItem value={1996}>1996</MenuItem>
          <MenuItem value={1997}>1997</MenuItem>
          <MenuItem value={1998}>1998</MenuItem>
          <MenuItem value={1999}>1999</MenuItem>
          <MenuItem value={2000}>2000</MenuItem>
          <MenuItem value={2001}>2001</MenuItem>
          <MenuItem value={2002}>2002</MenuItem>
          <MenuItem value={2003}>2003</MenuItem>
          <MenuItem value={2004}>2004</MenuItem>
          <MenuItem value={2005}>2005</MenuItem>
          <MenuItem value={2006}>2006</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}