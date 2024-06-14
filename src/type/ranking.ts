type Ranking = {
    id: number;
    teamId: number;
    year: number;
    week: number;
    ranking: number;
    isPostseasonGame: boolean;
    poll: string;
    conference: string;
    firstPlaceVotes: number | null;
    points: number | null;
}

export type RankingResponse = {
    id: number;
    team_id: number;
    year: number;
    week: number;
    ranking: number;
    postseason: number;
    poll: string;
    conference: string;
    first_place_votes: number | null;
    points: number | null;
}

export default Ranking;