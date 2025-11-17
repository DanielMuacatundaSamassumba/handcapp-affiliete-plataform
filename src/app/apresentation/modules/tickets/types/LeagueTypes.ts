export type League = {
  id: number;
  name: string;
  type: string;
  country_id: string;
  country_name: string;
  country_code: string;
  country_flag: string;
};


export type Fixture = {
  id: number;
  status: number;
  status_name: string;
  status_period: string | null;
  pitch: string | null;
  referee_id: string | null;
  round_id: string | null;
  round_name: string | null;
  season_id: string | null;
  season_name: string | null;
  stage_id: string | null;
  stage_name: string | null;
  group_id: string | null;
  group_name: string | null;
  aggregate_id: string | null;
  winner_team_id: number | null;
  venue_id: string | null;
  leg: string | null;
  week: string | null;
  deleted: string;
  info: string | null;
  related_id: string | null;
  attendance: string | null;

  time: {
    datetime: string;
    date: string;
    time: string;
    minute: number;
    timestamp: number;
    timezone: string;
  };

  teams: {
    home: {
      id: number;
      name: string;
      short_code: string;
      img: string;
      form: string | null;
      coach_id: string | null;
      kit_colors: {
        home_main_color: string;
        home_second_color: string;
        home_number_color: string;
        home_gk_main_color: string;
        home_gk_second_color: string;
        home_gk_number_color: string;
      };
    };
    away: {
      id: number;
      name: string;
      short_code: string;
      img: string;
      form: string | null;
      coach_id: string | null;
      kit_colors: {
        away_main_color: string;
        away_second_color: string;
        away_number_color: string;
        away_gk_main_color: string;
        away_gk_second_color: string;
        away_gk_number_color: string;
      };
    };
  };

  league: {
    id: number;
    name: string;
    type: string;
    country_id: string;
    country_name: string;
    country_code: string | null;
    country_flag: string | null;
  };

  scores: {
    home_score: string | null;
    away_score: string | null;
    ht_score: string | null;
    ft_score: string | null;
    et_score: string | null;
    ps_score: string | null;
  };

  standings: {
    home_position: number;
    away_position: number;
  };

  assistants: {
    first_assistant_id: string | null;
    second_assistant_id: string | null;
    fourth_assistant_id: string | null;
  };

  coverage: {
    has_lineups: number;
    has_tvs: number;
    has_standings: number;
  };

  weather_report: any | null;
};


export type Prediction = {
  id: string;
  name: string;
  market_id: string;
};

export type Market = {
  id: string;
  name: string;
  predictions: Prediction[];
};








export type GameResponse = {
  game: {
    id: number;
    status: number;
    status_name: string;
    status_period: string | null;
    pitch: string | null;
    referee_id: string | null;
    round_id: string | null;
    round_name: string | null;
    season_id: string | null;
    season_name: string | null;
    stage_id: string | null;
    stage_name: string | null;
    group_id: string | null;
    group_name: string | null;
    aggregate_id: string | null;
    winner_team_id: number | null;
    venue_id: string | null;
    leg: string | null;
    week: string | null;
    deleted: string | null;
    related_id: string | null;
    info: string | null;
    attendance: string | null;
    time: {
      datetime: string;
      date: string;
      time: string;
      minute: number;
      timestamp: number;
      timezone: string;
    };
    teams: {
      home: {
        id: number;
        name: string;
        short_code: string;
        img: string;
        form: string;
        coach_id: number;
        kit_colors: {
          home_main_color: string;
          home_second_color: string;
          home_number_color: string;
          home_gk_main_color: string;
          home_gk_second_color: string;
          home_gk_number_color: string;
        };
      };
      away: {
        id: number;
        name: string;
        short_code: string;
        img: string;
        form: string;
        coach_id: number;
        kit_colors: {
          away_main_color: string;
          away_second_color: string;
          away_number_color: string;
          away_gk_main_color: string;
          away_gk_second_color: string;
          away_gk_number_color: string;
        };
      };
    };
    league: {
      id: number;
      name: string;
      type: string;
      country_id: string | null;
      country_name: string;
      country_code: string | null;
      country_flag: string | null;
    };
    scores: {
      home_score: string;
      away_score: string;
      ht_score: string;
      ft_score: string;
      et_score: string | null;
      ps_score: string | null;
    };
    standings: {
      home_position: number;
      away_position: number;
    };
    assistants: {
      first_assistant_id: string | null;
      second_assistant_id: string | null;
      fourth_assistant_id: string | null;
    };
    coverage: {
      has_lineups: number;
      has_tvs: number;
      has_standings: number;
    };
    weather_report: string | null;
  };
  gameData: {
    id: string;
    odd: string;
    prognostic: string;
    ticket_id: string;
    game_id: number;
    status: string;
    game_home_team_common_name: string | null;
    game_away_team_common_name: string | null;
    game_home_team_common_img: string | null;
    game_away_team_common_img: string | null;
    game_date_time: string | null;
    game_league_name: string | null;
    game_home_team_id: string | null;
    game_away_team_id: string | null;
  };
};
interface Home {
  id: number;
  name: string;
  short_code: string;
  img: string;
  form: string;
  coach_id: number;
  kit_colors: {
    home_main_color: string;
    home_second_color: string;
    home_number_color: string;
    home_gk_main_color: string;
    home_gk_second_color: string;
    home_gk_number_color: string;
  }
}


export interface cardGameType {

      home: {
        id: number;
        name: string;
        short_code: string;
        img: string;
        form: string;
        coach_id: number;
        kit_colors: {
          home_main_color: string;
          home_second_color: string;
          home_number_color: string;
          home_gk_main_color: string;
          home_gk_second_color: string;
          home_gk_number_color: string;
        };
      };
      
      away: {
        id: number;
        name: string;
        short_code: string;
        img: string;
        form: string;
        coach_id: number;
        kit_colors: {
          away_main_color: string;
          away_second_color: string;
          away_number_color: string;
          away_gk_main_color: string;
          away_gk_second_color: string;
          away_gk_number_color: string;
        };
      };
    
  start_at: string,
  odd: string,
  prognosticType: string,
  league:{  id: number;
      name: string;
      type: string;
      country_id: string | null;
      country_name: string;
      country_code: string | null;
      country_flag: string | null;}
  game:Game
}





 export interface Game {
    id: number;
    status: number;
    status_name: string;
    status_period: string | null;
    pitch: string | null;
    referee_id: string | null;
    round_id: string | null;
    round_name: string | null;
    season_id: string | null;
    season_name: string | null;
    stage_id: string | null;
    stage_name: string | null;
    group_id: string | null;
    group_name: string | null;
    aggregate_id: string | null;
    winner_team_id: number | null;
    venue_id: string | null;
    leg: string | null;
    week: string | null;
    deleted: string | null;
    related_id: string | null;
    info: string | null;
    attendance: string | null;
    time: {
      datetime: string;
      date: string;
      time: string;
      minute: number;
      timestamp: number;
      timezone: string;
    };
    teams: {
      home: {
        id: number;
        name: string;
        short_code: string;
        img: string;
        form: string;
        coach_id: number;
        kit_colors: {
          home_main_color: string;
          home_second_color: string;
          home_number_color: string;
          home_gk_main_color: string;
          home_gk_second_color: string;
          home_gk_number_color: string;
        };
      };
      away: {
        id: number;
        name: string;
        short_code: string;
        img: string;
        form: string;
        coach_id: number;
        kit_colors: {
          away_main_color: string;
          away_second_color: string;
          away_number_color: string;
          away_gk_main_color: string;
          away_gk_second_color: string;
          away_gk_number_color: string;
        };
      };
    };
    league: {
      id: number;
      name: string;
      type: string;
      country_id: string | null;
      country_name: string;
      country_code: string | null;
      country_flag: string | null;
    };
    scores: {
      home_score: string;
      away_score: string;
      ht_score: string;
      ft_score: string;
      et_score: string | null;
      ps_score: string | null;
    };
    standings: {
      home_position: number;
      away_position: number;
    };
    assistants: {
      first_assistant_id: string | null;
      second_assistant_id: string | null;
      fourth_assistant_id: string | null;
    };
    coverage: {
      has_lineups: number;
      has_tvs: number;
      has_standings: number;
    };
    weather_report: string | null;
  };

