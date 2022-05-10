import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LineChart from './charts/LineChart01';
import Icon from './images/icon-01.svg';
import EditMenu from '../EditMenu';
import api from '../../service';
// Import utilities
import { tailwindConfig, hexToRGB } from './utils/Utils';


function DashboardCard01() {
  const [total,setTotal]=useState(0)
 const [change, setChange] = useState(true);
 const [chartData,setChartData]=useState([])
 const auth = localStorage.getItem('auth-token');
 const header = {
   headers: {
     'auth-token': auth
   }
 };
  useEffect(
		() => {
			api
				.get('api/earnings', header)
				.then((response) => {
          const reponse=response.data
          console.log(reponse)
          let label=[]
          let dat=[]
          reponse.forEach(element=> {
            label.push(element._id)
            dat.push(element.totalUnitsSold)
          })

          console.log(label,dat)
          setChartData({
            labels: label,
            datasets: [
              // Indigo line
              {
                data: dat
                ,
                fill: true,
                backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.sky[500])}, 0.08)`,
                borderColor: tailwindConfig().theme.colors.sky[500],
                borderWidth: 2,
                tension: 0,
                pointRadius: 0,
                pointHoverRadius: 3,
                pointBackgroundColor: tailwindConfig().theme.colors.sky[500],
                clip: 20,
              }
              // Gray line
              
            ]})
            const reducer = (accumulator, curr) => accumulator + curr;
            setTotal(dat.reduce(reducer));
      
			

					setChange(false);
				})
				.catch((err) => {
					console.log(err.response);
				});
		},
		[change]
	);
  

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-sky-50  rounded-sm border border-slate-200 rounded-lg">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 01" />
          {/* Menu button */}
          <EditMenu className="relative inline-flex">
            <li>
              <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 1</Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 2</Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">Remove</Link>
            </li>
          </EditMenu>
        </header>
        <h2 className="text-lg font-semibold text-slate-900 mb-2">SparkleMyCar</h2>
        <div className="text-xs font-semibold text-slate-900 uppercase mb-1">Sales</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-900 mr-2">{total}$</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">+49%</div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={128} />
      </div>
    </div>
  );
}

export default DashboardCard01;
