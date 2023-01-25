import axios, {AxiosResponse} from 'axios';

export interface Svg {
  width?: string;
  height?: string;
  viewBox?: string;
  g: { transform?: string };
  paths: { definition: string; id: string; fill?: string }[];
}

export async function getSvgFromUrl(url: string): Promise<Svg> {
  const response: AxiosResponse<string> = await axios.get<string>(url);
  const svg: string = response.data;

  const svgDoc: Document = new DOMParser().parseFromString(svg, 'image/svg+xml');

  const svgEl: SVGSVGElement | null = svgDoc.querySelector('svg');
  const gEl: SVGGElement | null = svgDoc.querySelector('g');
  const pathEls: NodeListOf<SVGPathElement> = svgDoc.querySelectorAll('path');

  return {
    width: svgEl?.getAttribute('width')?.replace('px', ''),
    height: svgEl?.getAttribute('height')?.replace('px', ''),
    viewBox: svgEl?.getAttribute('viewBox') || undefined,
    g: {transform: gEl?.getAttribute('transform') ?? undefined},
    paths: Array.from(pathEls).map((path, index) => {
      const paths = path.getAttribute('d') || '';
      const fill = path.getAttribute('fill') || '';
      const id = `${index}-${paths}`;
      return {definition: paths, fill, id};
    })
  };
}
