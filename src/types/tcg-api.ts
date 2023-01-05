export interface ApiErrorResponse {
  error: ApiError;
}

export interface ApiError {
  message: string;
  code: number;
}

export interface ListResponse<T> {
  data: T[];
}

export type ApiCardList = ListResponse<ApiCard>;

export interface ApiCard {
  id: string;
  name: string;
  images: ApiCardImages;
}

interface ApiCardImages {
  small: string;
  large: string;
}
