export type Ticket = {
  id?: string;
  key?: string
  number?: string;
  ticket_id?: string;
  odd?: string;
  amount_to_invest?: string;
  earn?: string;
  status?: string;
  image_path?: string | null;
  bet_house_id?: string;
  ticket_type_name?: string;
  important?: string;
  ticket_type_id?: string;
  affiliate_code?: string;
  bethouse?: {
    id?: string;
    name?: string;
    small_logo_path?: string;
  };
  user?: {
    id?: string;
    name?: string;
    image_path?: string | null;
  };
  games?: {
    id?: string;
    odd?: string;
    prognostic?: string;
    ticket_id?: string;
    game_id?: number;
    status?: string;
    game_home_team_common_name?: string | null;
    game_away_team_common_name?: string | null;
    game_home_team_common_img?: string | null;
    game_away_team_common_img?: string | null;
    game_date_time?: string | null;
    game_league_name?: string | null;
    game_home_team_id?: string | null;
    game_away_team_id?: string | null;
  }[];
  views_count?: number;
  start_at?: string;
  end_at?: string;
  deleted_at?: string | null;
  created_at?: string | undefined;
  row?: Ticket
};

export enum status_ticket_number {
  PENDING = "3",
  NORMAL = "0",
  ENTER = "1",
  MOLHOU = "2"
}


