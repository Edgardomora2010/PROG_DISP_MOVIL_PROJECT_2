export interface Post {
  id: number;
  created_at: string;
  title: string;
  title_en: string;
  place: string;
  period: string;
  history: string;
  ingredients: string;
  preparation: string;
  source_name: string;
  source_author: string;
  source_reference: string;
  source_url: string;
  latitude: number | null;
  longitude: number | null;
  source_id: number | null;
  place_id: number | null;
  image_url: string | null;
  recipe_context: string;
}

export interface State<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
