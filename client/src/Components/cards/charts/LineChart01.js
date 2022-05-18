import React, { useRef, useEffect } from 'react';

import {
  Chart, CategoryScale,LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment';

// Import utilities
import { tailwindConfig, formatValue } from '../utils/Utils';

Chart.register(LineController,CategoryScale, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip);

function LineChart01({
  data,
  width,
  height
}) {

  const canvas = useRef(null);

  useEffect(() => {

    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        chartArea: {
          backgroundColor: tailwindConfig().theme.colors.slate[50],
        },
        layout: {
          padding: 20,
        },
        scales: {
          y: {
            display: false,
            beginAtZero: true,
          },
          x: {
            display: false,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
             
              title: () => false, // Disable tooltip title
              label: (context) =>{ if (data.datasets[0].label=='Money')  return formatValue(context.parsed.y)},
            },
          },
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    });
    return () => chart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <canvas ref={canvas} width={width} height={height}></canvas>
  );
}

export default LineChart01;