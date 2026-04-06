export interface PCOEpisode {
  id: string;
  attributes: {
    title: string;
    published_at: string | null;
    description: string | null;
    image_url: string | null;
    video_url: string | null;
    audio_url: string | null;
  };
}

export interface PCOPerson {
  id: string;
  attributes: {
    first_name: string;
    last_name: string;
    avatar: string | null;
    email_addresses?: { address: string; primary: boolean }[];
  };
}

export interface PCOSchedule {
  id: string;
  attributes: {
    status: "C" | "D" | "U"; // Confirmed, Declined, Unconfirmed
    sort_date: string;
    team_position_name: string;
    service_type_name: string;
    plan_dates: string;
    plan_sort_date: string;
    respond_to_id: number | null;
  };
  relationships: {
    plan: { data: { id: string; type: string } };
    service_type: { data: { id: string; type: string } };
    team: { data: { id: string; type: string } };
    person: { data: { id: string; type: string } };
  };
}

export interface PCOPlan {
  id: string;
  attributes: {
    title: string | null;
    dates: string;
    sort_date: string;
    series_title: string | null;
    total_length: number;
    service_times: Array<{ day: string; time: string; name: string }>;
  };
  relationships: {
    service_type: { data: { id: string; type: string } };
  };
}

export interface PCOServiceType {
  id: string;
  attributes: {
    name: string;
    frequency: string | null;
    attachment_types_enabled: boolean;
  };
}

export interface PCOTeam {
  id: string;
  attributes: {
    name: string;
    default_status: string;
    default_prepare_notify_group: string | null;
    sequence: number;
  };
}

export interface PCOTeamMember {
  id: string;
  attributes: {
    status: string;
    name: string;
    photo_thumbnail: string | null;
    team_position_name: string;
  };
}

export interface PCOListResponse<T> {
  data: T[];
  included?: unknown[];
  meta: {
    total_count: number;
    count: number;
    next?: { offset: number };
    prev?: { offset: number };
    can_query_includes?: string[];
  };
  links: {
    self: string;
    next?: string;
    prev?: string;
  };
}

export interface PCOSingleResponse<T> {
  data: T;
  included?: unknown[];
}
