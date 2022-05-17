import React from 'react';


// Import utilities
import { tailwindConfig } from './utils/Utils';
import{ useEffect, useRef,useState } from 'react';
import api from '../../service';
import {
  Chart, PieController, ArcElement, TimeScale, Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment';
Chart.register(PieController, ArcElement, TimeScale, Tooltip);

function DashboardCard06() {
  const [chartData,setChartData]=useState([])
  const [change, setChange] = useState(true);
  const auth = localStorage.getItem('auth-token');
  const header = {
    headers: {
      'auth-token': auth
    }
  };
  useEffect(
		() => {
			api
				.get('api/topPackages', header)
				.then((response) => {
          const reponse=response.data
          console.log(reponse);
          
          let label=[]
          let dat=[]
          reponse.forEach(element=> {
            label.push(element._id)
            dat.push(element.count)
          })
          console.log(label,dat);
          
          
          setChartData( {
            labels: label ,
            datasets: [
              {
                label: 'Top Packages',
                data: dat,
                backgroundColor: [
                  tailwindConfig().theme.colors.indigo[500],
                  tailwindConfig().theme.colors.blue[400],
                  tailwindConfig().theme.colors.indigo[800],
                ],
                hoverBackgroundColor: [
                  tailwindConfig().theme.colors.indigo[600],
                  tailwindConfig().theme.colors.blue[500],
                  tailwindConfig().theme.colors.indigo[900],
                ],
                hoverBorderColor: tailwindConfig().theme.colors.white,
              },
            ],
          }
          )
           

        setChange(false);
  
        // eslint-disable-next-line react-hooks/exhaustive-deps

      
			

	
				})
				.catch((err) => {
					console.log(err.response);
				});
        const ctx = canvas.current;
        // eslint-disable-next-line no-unused-vars
        const chart = new Chart(ctx, {
            type: 'pie',
            data: chartData,
            options: {

                animation: {
                    duration: 500,
                },
                maintainAspectRatio: false,
                resizeDelay: 200,
            }
        });
        return () => chart.destroy();
		},
    [change])

    const canvas = useRef(null);
    const legend = useRef(null);


  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
   <header className="px-3 py-3 border-b border-slate-100">
        <h2 className="font-semibold  text-lg text-slate-800">Top packages</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}

      <div className="grow flex flex-col justify-center">
            <div>
                <canvas ref={canvas} width={389} height={260}></canvas>
            </div>
            <div className="px-5 pt-2 pb-6">
                <ul ref={legend} className="flex flex-wrap justify-center -m-1">
                        
                </ul>
            </div>
        </div>
    </div>
  );
}

export default DashboardCard06;
