// Can serve as direct response from backend
type TeamGame = {
    id: number,
    year: number,
    week: number,
    isPostseasonGame: boolean,
    gameStatus: 'W' | 'L' | 'T' | null, // if team w/game won, lost, etc
    isCompleted: boolean;
    isConferenceGame: boolean;
    opponentTeamId: number;
    teamPoints: number;
    opponentTeamPoints: number;
    // TODO indicate home team
}

export type GameResponse = {
    id: number
    year: number,
    week: number,
    postseason: number,
    points_home: number | null;
    points_away: number| null;
    completed: number;
    conference_game: number;
    id_home_team: number;
    id_away_team: number;
}


export default TeamGame;