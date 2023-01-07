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
  switch (color) {
    case 'white':
      return '#EFF2F3';
    case 'black':
      return '#1A1A1A';
    case 'gray':
      return Color(color).lightness(49).hex();
    case 'blue':
      return Color(color).saturationv(40).rotate(-20).hex();
    case 'pink':
      return Color(color).saturationl(35).white(35).hex();
    case 'yellow':
      return Color('#BFB040').hex();
    case 'red':
      return Color('#F8685E').lightness(65).hex();
    default:
      return Color(color).saturationv(1).white(35).hex();
  }
}
