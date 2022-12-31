export interface ApiResourceList {
  count: number;
  next: string;
  previous: string;
  results: ApiNamedResource[];
}

export interface ApiNamedResource {
  name: string,
  url: string
}
