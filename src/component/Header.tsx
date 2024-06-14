'use client'
import { AppBar, Stack, Toolbar, Typography } from '@mui/material';
import footballWhite from '../image/football-white.png';
import useWindowSize from '../hook/useWindowSize';
import Image from 'next/image';

const Header: React.FC = () => {
    const windowSize = useWindowSize();
    const width = windowSize.width;

    return (
        // Position is relative so SchedulePage can stick to its top
        <div>
            <AppBar position="static" sx={{ backgroundColor: 'green' }}>
                <Toolbar style={{ margin: '0 auto', width: '90%' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" width="85vw">
                        <a href='http://cfbhistory.net' style={{ color: 'white', textDecoration: 'none' }}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Image src={footballWhite} alt="logo" height={40}/>
                                <Typography sx={{ fontFamily: 'Cambria' }} variant="h4" component="div">
                                    CFBHistory
                                </Typography>
                            </Stack>
                        </a>
                        {width > 650 ?
                            <Typography sx={{ display: 'flex' }} variant="h6">
                            Discover records, logos, and more!
                            </Typography> 
                            : ''}
                    </Stack>
                </Toolbar>
            </AppBar> 
        </div>
    );
};

export default Header;