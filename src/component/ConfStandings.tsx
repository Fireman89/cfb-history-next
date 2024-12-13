'use client'
/* eslint-disable react/prop-types */
import { Box, Paper, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Conference } from '../type/conference';
import TeamRecord from './TeamRecord';
import useWindowSize from '../hook/useWindowSize';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { zoomWidth } from '../const/const';

interface MyProps {
    conference: Conference;
    loading: boolean;
}

// Rectangular standings of every team in conference
const ConfStandings: React.FC<MyProps> = ({ conference, loading }) => {
    const windowSize = useWindowSize();
    const [display, setDisplay] = useState(true);
    const isZoomWidth = windowSize.width >= zoomWidth;

    const divHeight = isZoomWidth ? 50 : 30;
    const height = isZoomWidth ? 110 : 70;
    const width = isZoomWidth ? 260 : 220;
    const fontSize = isZoomWidth ? 21 : 18;

    return (
        <Grid container direction="column">
            {/* Header w/conference name & drop down icon */}
            <Paper component={Stack} direction="row" justifyContent="center"  sx={{ cursor: 'pointer' }} onClick={() => setDisplay(!display)} alignItems="center" square elevation={0} style={{ fontSize: fontSize, height: divHeight, width: width, zIndex: 0 }}>
                <Stack direction="row" alignItems="center" width="100%">
                    <Box width="15%"/>
                    <b style={{ width:'70%', textWrap: 'nowrap' }}>{conference.name}</b>
                    {display ?
                        <ExpandMoreIcon width="15%"/>
                        : <ExpandLessIcon width="15%"/>
                    }
                </Stack>
            </Paper>
            {/* Every team w/logo & record */}
            {display && conference.divisions.map(div => 
                <>
                    {div.name !== '' && 
                        <Paper component={Stack} justifyContent="center" square elevation={0} style={{ fontSize: fontSize, height: divHeight, width: width, background: 'lightgray', zIndex: 0 }}>
                            <b>{div.name}</b>
                        </Paper>
                    } 
                    {div.teams.map(team => <TeamRecord key={team.id} record={team} height={height} width={width} loading={loading} fontSize={fontSize}/>)}
                </>
            )}
        </Grid>
    );
};

export default ConfStandings;