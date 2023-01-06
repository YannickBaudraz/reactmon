import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip
} from 'chart.js';

export default () => {
  ChartJs.register(
      RadialLinearScale,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      BarElement,
      Filler,
      Title,
      Tooltip
  );
}
