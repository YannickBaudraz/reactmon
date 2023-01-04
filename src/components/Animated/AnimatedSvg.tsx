import {useEffect, useRef, useState} from 'react';
import {getSvgFromUrl, Svg} from '../../lib/svg';
import anime from 'animejs';
import Color from 'color';

interface AnimatedSvgProps {
  svgUrl: string;
  className?: string;
  scale?: number;
}

export function AnimatedSvg({svgUrl, className, scale = 1}: AnimatedSvgProps) {
  const [svg, setSvg] = useState<Svg>();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    (async () => setSvg(await getSvgFromUrl(svgUrl)))();
  }, []);

  useEffect(() => {
    if (svgRef.current && svg) {
      svgRef.current.classList.remove('hidden');
      animate(svgRef.current.querySelectorAll('path'));
    }
  }, [svg]);

  if (!svg) return null;

  return (
      <svg
          ref={svgRef}
          width={parseFloat(svg.width as string) * scale}
          height={parseFloat(svg.height as string) * scale}
          viewBox={svg?.viewBox as string}
          className={className}
      >
        <g>
          {svg?.paths.map(path => (
              <path
                  key={path.id}
                  d={path.definition}
                  fill="none"
                  strokeWidth="0.5"
                  data-fill={Color(path.fill).desaturate(0.15).hex()}
                  preserveAspectRatio="none"
              />
          ))}
        </g>
      </svg>
  );
}

function animate(paths: NodeListOf<SVGPathElement>) {
  const duration = 1000;

  anime({
    targets: paths,
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: duration,
    stroke: [
      'none',
      (el: any) => el.getAttribute('data-fill')
    ],
    fill: [
      {value: Color('white').alpha(0).toString(), duration: 0},
      {value: (el: any) => el.getAttribute('data-fill'), delay: duration / 1.25}
    ],
    easing: 'easeInOutSine'
  });
}
