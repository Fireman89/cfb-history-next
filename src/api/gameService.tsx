import axios from 'axios';
import GameStatus from '../type/gameStatus';
import TeamGame, { GameResponse } from '../type/teamGame';
import Schedule, { ScheduleResponse } from '../type/schedule';

const GameService = {
    createScheduleGame(r: GameResponse, teamId: number) {
        // If points are null, don't add
        if (r.points_away == null || r.points_home == null)
            return null;
        let gameStatus: GameStatus = null;
        let opponentTeamId: number = 0;
        let teamPoints: number = 0;
        let opponentTeamPoints: number = 0;
        // Map if game was won/lost/etc. by team; assume api always returns game w/their id
        if (teamId === r.id_home_team) {
            opponentTeamId = r.id_away_team;
            teamPoints = r.points_home;
            opponentTeamPoints = r.points_away;
            if (r.points_home > r.points_away)
                gameStatus = 'W';
            else if (r.points_home < r.points_away)
                gameStatus = 'L';
        } else if (teamId === r.id_away_team) {
            opponentTeamId = r.id_home_team;
            teamPoints = r.points_away;
            opponentTeamPoints = r.points_home;
            if (r.points_home < r.points_away)
                gameStatus = 'W';
            else if (r.points_home > r.points_away)
                gameStatus = 'L';
        }
        if (r.points_home === r.points_away)
            gameStatus = 'T';                        
        // null if points were not in response
        const game: TeamGame = {
            id: r.id,
            year: r.year,
            week: r.week,
            isPostseasonGame: r.postseason == 1,
            gameStatus: gameStatus,
            isCompleted: r.completed == 1,
            isConferenceGame: r.conference_game == 1,
            opponentTeamId,
            teamPoints,
            opponentTeamPoints
        };
        return game;
    },
    createScheduleGames(gr: GameResponse[], teamId: number) {
        const games: TeamGame[] = [];
        gr.forEach(r => {
            const game = this.createScheduleGame(r,teamId);
            // Don't push game that didn't have home/away points
            if (game != null)
                games.push(game);
        });
        return games;
    },
    async getAllTeamSchedules(year: number) {
        try {
            const { data: gameResp } = await axios.get<GameResponse[]>('/api/game/' + year);
            const schedules: Schedule[] = [];
            gameResp.forEach(g => {
                let homeFound = false;
                let awayFound = false;
                // Loop over exiting teams' schedules & add game if team played in game
                for (let i = 0; i < schedules.length; i++) {
                    let teamId = schedules[i].teamId;
                    if (teamId == g.id_home_team || teamId == g.id_away_team) {
                        let game = this.createScheduleGame(g,teamId);
                        // If game had no scores, don't add
                        if (game != null)
                            schedules[i].games.push(game);
                        if (teamId == g.id_home_team)
                            homeFound = true;
                        if (teamId == g.id_away_team)
                            awayFound = true;
                    }
                    if (homeFound && awayFound)
                        break;
                };
                // Create a new team schedule if the home/away team doesn't have one yet
                if (!homeFound) {
                    let game = this.createScheduleGame(g,g.id_home_team);
                    if (game != null) {
                        schedules.push({
                            teamId: g.id_home_team,
                            games: [...[], game]
                        });
                    }
                }
                if (!awayFound) {
                    let game = this.createScheduleGame(g,g.id_away_team);
                    if (game != null) {
                        schedules.push({
                            teamId: g.id_away_team,
                            games: [...[], game]
                        });
                    }
                }
            });
            return schedules;
        } catch (error) {            
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }
    // Unused
    // ,
    // async getTeamGamesForYear(teamId: number, year: number) {
    //     try {
    //         const { data: resp } = await axios.get<GameResponse[]>(HOST + '/game/' + teamId, { params: { year }});
    //         const games: TeamGame[] = [];
    //         resp.forEach(r => {
    //             const game = this.createScheduleGame(r,teamId);
    //             games.push(game);
    //         });
    //         return games;
    //     } catch (error) {            
    //         if (axios.isAxiosError(error)) {
    //             console.log('error message: ', error.message);
    //             return error.message;
    //         } else {
    //             console.log('unexpected error: ', error);
    //             return 'An unexpected error occurred';
    //         }
    //     }
    // }
};

export default GameService;