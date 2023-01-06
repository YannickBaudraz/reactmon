export interface Svg {
  width?: string;
  height?: string;
  viewBox?: string;
  g: { transform?: string };
  paths: { definition: string; id: string; fill?: string }[];
}

export async function getSvgFromUrl(url: string): Promise<Svg> {
  const response = await fetch(url);
  const svgString = await response.text();
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
  const svg = svgDoc.querySelector('svg');
  const g = svgDoc.querySelector('g');
  const pathElements = svgDoc.querySelectorAll('path');

  return {
    width: svg?.getAttribute('width')?.replace('px', ''),
    height: svg?.getAttribute('height')?.replace('px', ''),
    viewBox: svg?.getAttribute('viewBox') || undefined,
    g: {transform: g?.getAttribute('transform') ?? undefined},
    paths: Array.from(pathElements).map((path, index) => {
      const paths = path.getAttribute('d') || '';
      const fill = path.getAttribute('fill') || '';
      const id = `${index}-${paths}`;
      return {definition: paths, fill, id};
    })
  };
}
