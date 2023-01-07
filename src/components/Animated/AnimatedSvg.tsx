import {useEffect, useRef, useState} from 'react';
import {getSvgFromUrl, Svg} from '../../lib/svg';
import anime, {AnimeParams} from 'animejs';
import Color from 'color';

interface AnimatedSvgProps {
  svgUrl: string;
  containerSize: { height: number, width: number };
  onComplete?: () => void;
}

export function AnimatedSvg({svgUrl, containerSize, onComplete}: AnimatedSvgProps) {
  const [svg, setSvg] = useState<Svg | undefined>(undefined);
  const [currentSvgUrl, setCurrentSvgUrl] = useState<string | undefined>(undefined);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (svgUrl !== currentSvgUrl) {
      setSvg(undefined);
      setIsComplete(false);
      getSvgFromUrl(svgUrl).then(setSvg);
      setCurrentSvgUrl(svgUrl);
    }
  }, [svgUrl]);

  useEffect(() => {
    if (svgRef.current && svg && !isComplete) {
      svgRef.current.classList.remove('hidden');
      animate(svgRef.current.querySelectorAll('path'));
    }
  }, [svg, isComplete]);

  if (!svg) return null;

  return (
      <svg
          ref={svgRef}
          width={containerSize.width * 0.9}
          height={containerSize.height * 0.9}
          viewBox={`0 0 ${svg.width} ${svg.height}`}
          key={svgUrl}
      >
        <g fill="none"
           strokeWidth="0.5"
           transform={svg.g?.transform}
        >
          {svg.paths.map(path => (
              <path
                  key={path.id}
                  d={path.definition}
                  data-fill={Color(path.fill).desaturate(.5).hex()}
              />
          ))}
        </g>
      </svg>
  );

  function animate(paths: NodeListOf<SVGPathElement>) {
    const totalDuration = 3500;

    const strokeFromTo: AnimeParams['stroke'] = [
      'none',
      (el: any) => el.getAttribute('data-fill')
    ];

    const fillFromTo: AnimeParams['fill'] = [
      {value: Color('white').alpha(0).toString(), duration: 0},
      {value: (el: any) => el.getAttribute('data-fill'), delay: totalDuration * .2}
    ];

    const delayBetweenEachPaths: AnimeParams['delay'] = anime.stagger(5, {
      grid: [paths.length, 10],
      from: 'center'
    });

    const onUpdate = (anim: anime.AnimeInstance) => {
      setIsComplete(prevIsComplete => {
        const elasticEasingLookFinished = anim.progress >= 50;
        if (elasticEasingLookFinished && !prevIsComplete) {
          onComplete?.();
          return true;
        }
        return prevIsComplete;
      });
    };

    anime({
      targets: paths,
      duration: totalDuration,
      stroke: strokeFromTo,
      strokeDashoffset: [anime.setDashoffset, 0],
      fill: fillFromTo,
      delay: delayBetweenEachPaths,
      easing: 'easeOutElastic(1, .5)',
      update: onUpdate
    });
  }
}
