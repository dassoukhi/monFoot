type Team = {
  id: string | number;
  logo: string;
  name: string;
  checked: boolean;
};
type league = {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
};
type teams = {
  home: {
    id: number;
    name: string;
    logo: string;
    winner: null;
  };
  away: {
    id: number;
    name: string;
    logo: string;
    winner: null;
  };
};

type fixture = {
  id: number;
  referee: null;
  timezone: string;
  date: string;
  timestamp: number;
  periods: {
    first: null;
    second: null;
  };
  venue: {
    id: number;
    name: string;
    city: string;
  };
  status: {
    long: string;
    short: string;
    elapsed: null;
  };
};
type EventCaming = {
  teams: teams;
  fixture: fixture;
};
