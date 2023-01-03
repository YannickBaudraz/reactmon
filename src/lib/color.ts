import Color from 'color';

export enum RankingColor {
  Awesome = '#b578f4',
  Great = '#53c3b7',
  Good = '#5ece82',
  Average = '#ecc24b',
  Bad = '#f5914d',
  Horrible = '#f8685e',
}

export function getUIColor(color: string) {
  return color === 'white'
      ? Color('#d5dbe1').darken(.01).string()
      : Color(color).desaturate(0.33).fade(0.33).string();
}
