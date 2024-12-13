'use client'
/* eslint-disable react/prop-types */
import { Box, CircularProgress, Grid, Modal, Stack } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
import { useAppDispatch }  from '../store/hooks';
import { setScheduleTeamId } from '../store/currentScheduleSlice';
import { SeasonRecord } from '../type/record';
import TeamLogo from './TeamLogo';
import useWindowSize from '../hook/useWindowSize';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import TeamSchedule from './TeamSchedule';
import { desktopHeight, desktopWidth, zoomWidth } from '../const/const';

interface MyProps {
    record: SeasonRecord;
    height: number;
    width: number;
    loading: boolean;
    fontSize: number;
}

// Box in ConfStandings per team containing logo & record
const TeamRecord: React.FC<MyProps> = ({ record, height, width, loading, fontSize }) => {   
    const [showModal, setShowModal] = useState(false);
    function closeModal() {
        setShowModal(false);
    }
    const windowSize = useWindowSize();
    const isDesktopWidth = windowSize.width >= desktopWidth;
    const isZoomWidth = windowSize.width >= zoomWidth;
    const isDesktopHeight = windowSize.height >= desktopHeight;
    
    const dispatch = useAppDispatch();
    const team = record.team;
    const logoHeight = height - 10;
    let shrinkFont: boolean = false;
    if (isZoomWidth) {
        if (team.school.length > 20)
            shrinkFont = true;
    } else {
        if (team.school.length >= 16)
            shrinkFont = true;
    }

    return loading ? (
        <Stack
            style={{ height: height, width: width, zIndex: 0, fontSize: fontSize, backgroundColor: 'white' }}
            alignContent="center" alignItems="center" justifyContent="center"
        >
            <CircularProgress/>
        </Stack>
    ) : (
        <>
            {/* TODO - put this modal in another component to be reused in Rankings, 
            maybe use different formatting
            instead of reusing TeamSchedule component
        */}
            {/* If on mobile, allow user to tap team to pull up their schedule */}
            {(!isDesktopWidth || !isDesktopHeight) &&
            <Modal open={showModal} onClose={() => closeModal()} sx={{overflowY: 'scroll'}}>
                <Box alignItems="center" sx={{ top: 0, left: 0, width: '100%', background: 'white'}}>
                    <CloseIcon
                        fontSize="large"
                        onClick={() => closeModal()}
                        sx={{ position: 'sticky' }}
                    />
                    <Stack direction="row" justifyContent="center" paddingLeft={5} paddingRight={5} spacing={2}>
                        <TeamSchedule teamId={team.id} year={record.year}/>
                    </Stack>
                </Box>
            </Modal>
            }
            {/* Entry */}
            <Stack
                style={{ height: height, width: width, zIndex: 0, fontSize: fontSize, backgroundColor: 'white' }}
                onMouseEnter={() => dispatch(setScheduleTeamId(team.id))}
                onClick={() => setShowModal(true)}
            >
                <Grid container height={height} width={width} alignContent="center" alignItems="center">
                    <Grid item xs={isZoomWidth ? 6 : 4}>
                        <Stack alignItems="center" alignContent="center" justifyContent="center">
                            <TeamLogo teamId={team.id} xy maxHeight={logoHeight}/>
                        </Stack>
                    </Grid>
                    {/* TODO replace container with more manual text centering */}
                    <Grid item xs={isZoomWidth ? 6 : 8} container direction="column" wrap="nowrap" alignContent="center" alignItems="center" height="90%">
                        <Grid item container xs={7} justifyContent="center" alignContent="center" alignItems="center" width="auto">
                            <b style={{ fontSize: shrinkFont ? fontSize - 3 : fontSize - 2 }}>
                                {team.school}
                            </b>
                        </Grid>
                        <Grid item xs={5}>
                            <Box fontSize={fontSize}>
                                {record.totalWins + '-' + record.totalLosses}
                                {record.totalTies > 0 ? record.totalTies : ''}
                                {' (' + record.totalConfWins + '-' + record.totalConfLosses}
                                {record.totalConfTies > 0 ? record.totalConfTies + ')' : ')'}
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Stack>
        </>
    );
};

export default TeamRecord;