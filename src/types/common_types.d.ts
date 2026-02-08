export interface GeneralOptions {}

export interface CommonGetOptions extends GeneralOptions {
  search?: string;
  offset: number;
  limit: number;
  sort_by?: "ASC" | "DESC" | "asc" | "desc";
  status_id?: boolean;
}
