import {useEffect, useRef, useState} from 'react';
import {getSvgFromUrl, Svg} from '../../lib/svg';
import anime, {AnimeParams} from 'animejs';
import Color from 'color';

interface AnimatedSvgProps {
  svgUrl: string;
  containerSize: { height: number, width: number };
  /**
   * @description Callback when the animation is looking complete
   */
  onLookingComplete?: () => void;
}

export function AnimatedSvg({svgUrl, containerSize, onLookingComplete}: AnimatedSvgProps) {
  const [svg, setSvg] = useState<Svg | undefined>(undefined);
  const [currentSvgUrl, setCurrentSvgUrl] = useState<string | undefined>(undefined);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isLookingComplete, setIsLookingComplete] = useState(false);

  useEffect(() => {
    if (svgUrl !== currentSvgUrl) {
      setSvg(undefined);
      setIsLookingComplete(false);
      getSvgFromUrl(svgUrl).then(setSvg);
      setCurrentSvgUrl(svgUrl);
    }
  }, [svgUrl]);

  useEffect(() => {
    if (svgRef.current && svg && !isLookingComplete) {
      svgRef.current.classList.remove('hidden');
      animate(svgRef.current.querySelectorAll('path'));
    }
  }, [svg, isLookingComplete]);

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
      setIsLookingComplete(prevIsComplete => {
        const isElasticEasingLookFinished = anim.progress >= 50;
        if (isElasticEasingLookFinished && !prevIsComplete) {
          onLookingComplete?.();
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
