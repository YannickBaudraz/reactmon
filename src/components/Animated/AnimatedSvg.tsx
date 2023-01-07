import {useEffect, useRef, useState} from 'react';
import {getSvgFromUrl, Svg} from '../../lib/svg';
import anime from 'animejs';
import Color from 'color';

interface AnimatedSvgProps {
  svgUrl: string;
  containerSize: { height: number, width: number };
}

export function AnimatedSvg({svgUrl, containerSize}: AnimatedSvgProps) {
  const [svg, setSvg] = useState<Svg>();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    (async () => setSvg(await getSvgFromUrl(svgUrl)))();
  }, [svgUrl]);

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
          width={containerSize.width * 0.9}
          height={containerSize.height * 0.9}
          viewBox={`0 0 ${svg.width} ${svg.height}`}
      >
        <g fill="none"
           strokeWidth="0.5"
           transform={svg.g?.transform}
        >
          {svg?.paths.map(path => (
              <path
                  key={path.id}
                  d={path.definition}
                  data-fill={Color(path.fill).desaturate(.5).hex()}
              />
          ))}
        </g>
      </svg>
  );
}

function animate(paths: NodeListOf<SVGPathElement>) {
  const duration = 3500;

  anime({
    targets: paths,
    duration,
    stroke: [
      'none',
      (el: any) => el.getAttribute('data-fill')
    ],
    strokeDashoffset: [anime.setDashoffset, 0],
    fill: [
      {value: Color('white').alpha(0).toString(), duration: 0},
      {value: (el: any) => el.getAttribute('data-fill'), delay: duration * .2}
    ],
    delay: anime.stagger(5, {from: 'center', grid: [paths.length, 10]}),
    easing: 'easeOutElastic(1.5, .5)'
  });
}
