'use client'
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, IconButton, MenuItem, Select, Stack, Switch, Typography } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUseCurrentLogo } from '../store/currentLogoSlice';
import RankingsModal from './RankingsModal';
import useWindowSize from '../hook/useWindowSize';
import { CURRENT_YEAR, FIRST_YEAR, desktopWidth } from '../const/const';

interface MyProps {
    defaultYear: number,
    onChange: any,
    incrementYear: any,
    decrementYear: any
}

const arrowWidth = 40;

const ConfYear: React.FC<MyProps> = ({ defaultYear, onChange, incrementYear, decrementYear }) => {
    const useCurrentLogo = useAppSelector(state => state.currentLogo.useCurrentLogo);
    const windowSize = useWindowSize();
    const isDesktopWidth = windowSize.width >= desktopWidth;
    const isFirstYear = defaultYear === FIRST_YEAR;
    const isCurrentYear = defaultYear === CURRENT_YEAR - 1;

    const dispatch = useAppDispatch();
    const [year, setYear] = useState(defaultYear);
    useEffect(() => {
        setYear(defaultYear);
    },[defaultYear]);
    const years = Array.from({ length: CURRENT_YEAR - FIRST_YEAR}, (value, index) => index + FIRST_YEAR);
    function handleChange(event: any) {
        onChange(event.target.value);
    }
    return (
        <Stack spacing={2} direction="row" alignItems="center" width="90vw">
            <Box width="20%">
                {!isDesktopWidth && 
                    <RankingsModal year={year}/>
                }
            </Box>
            <Stack spacing={1} direction="row" justifyContent="center" width="60%">
                <Box display="flex" width={arrowWidth}>
                    {!isFirstYear &&
                        <IconButton onClick={decrementYear}>
                            <ArrowLeftIcon/>
                        </IconButton>
                    }
                </Box>
                <Select value={year} onChange={handleChange} style={{ backgroundColor:'white'}}>
                    {years.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                </Select>            
                <Box display="flex" width={arrowWidth}>
                    {!isCurrentYear &&
                        <IconButton onClick={incrementYear}>
                            <ArrowRightIcon/>
                        </IconButton>
                    }
                </Box>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="center" width="20%">
                <Typography>Current Logos</Typography>
                <Switch checked={useCurrentLogo} onChange={() => dispatch(setUseCurrentLogo())}/>
            </Stack>
        </Stack>
    );
};

export default ConfYear;