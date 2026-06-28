type Team = {
  id: string | number;
  logo: string;
  name: string;
  checked: boolean;
};

type League = {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
};

// Alias pour compatibilité
type league = League;

type MatchTeam = {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
};

type Teams = {
  home: MatchTeam;
  away: MatchTeam;
};

// Alias pour compatibilité
type teams = Teams;

type Fixture = {
  id: number;
  referee: string | null;
  timezone: string;
  date: string;
  timestamp: number;
  periods: {
    first: number | null;
    second: number | null;
  };
  venue: {
    id: number;
    name: string;
    city: string;
  };
  status: {
    long: string;
    short: string;
    elapsed: number | null;
  };
};

// Alias pour compatibilité
type fixture = Fixture;

type EventCaming = {
  teams: Teams;
  fixture: Fixture;
};

type LeagueWithMatches = {
  league: League;
  matchs: EventCaming[];
};

type LeaguesResponse = LeagueWithMatches[][];

type FavoriteTeam = {
  id: string;
  userId: string;
  teamId: string;
};
