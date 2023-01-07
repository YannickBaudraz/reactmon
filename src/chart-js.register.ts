import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip
} from 'chart.js';

export default () => {
  ChartJs.register(
      // Bar
      BarElement,
      RadialLinearScale,
      CategoryScale,
      LinearScale,
      // Radar
      PointElement,
      LineElement,
      Filler,
      Tooltip
  );
}
