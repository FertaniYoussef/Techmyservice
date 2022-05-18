import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from './charts/LineChart01';
import Icon from './images/icon-01.svg';
import EditMenu from '../EditMenu';
import { useEffect, useState, useRef } from 'react';
import api from '../../service';
// Import utilities
import { tailwindConfig, hexToRGB } from './utils/Utils';
import {
	Chart,
	Filler,
	PointElement,
	LinearScale,
	TimeScale,
	Tooltip,
	BarController,
	BarElement,
	Legend,
	CategoryScale
} from 'chart.js';
import 'chartjs-adapter-moment';
// Import utilities
Chart.register(CategoryScale, BarController, BarElement, Filler, LinearScale, TimeScale, Tooltip, Legend);

function DashboardCard02() {
	const [ chartData, setChartData ] = useState([]);
	const [ total, setTotal ] = useState(0);
	const [ change, setChange ] = useState(true);
	const auth = localStorage.getItem('auth-token');
	const header = {
		headers: {
			'auth-token': auth
		}
	};

	const canvas = useRef(null);
	useEffect(
		() => {
			api
				.get('api/ordersnumber', header)
				.then((response) => {
					const reponse = response.data;

					let label = [];
					let dat = [];
					reponse.forEach((element) => {
						label.push(element._id);
						dat.push(element.count);
					});

					setChartData({
						labels: label,
						datasets: [
							// Indigo line
							{
								label: 'Orders',
								data: dat,
								fill: true,
								backgroundColor: tailwindConfig().theme.colors.sky[500],
								borderColor: tailwindConfig().theme.colors.sky[500],
								borderWidth: 1,
								tension: 0.1,
								pointRadius: 0,
								pointHoverRadius: 3,
								pointBackgroundColor: tailwindConfig().theme.colors.sky[500]
							}
						]
					});
					const reducer = (accumulator, curr) => accumulator + curr;
					setTotal(dat.reduce(reducer));

					console.log(chartData);

					setChange(false);
				})
				.catch((err) => {
					console.log(err.response);
				});
			const ctx = canvas.current;
			// eslint-disable-next-line no-unused-vars
			const chart = new Chart(ctx, {
				type: 'bar',
				data: chartData,
				options: {
					scales: {
						y: {
							display: false,
							grid: {
								drawBorder: false
							},
							ticks: {
								maxTicksLimit: 5
							}
						},
						x: {
							type: 'time',
							time: {
								parser: 'DD-MM-YYYY',
								unit: 'day'
							},
							grid: {
								display: false,
								drawBorder: true
							},
							display: true
						}
					},
					plugins: {
						legend: {
							display: false
						}
					},
					interaction: {
						intersect: false,
						mode: 'nearest'
					},
					animation: {
						duration: 500
					},
					maintainAspectRatio: false,
					resizeDelay: 200
				}
			});
			return () => chart.destroy();
		},
		[ change ]
	);

	return (
		<div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white  rounded-sm  shadow-lg rounded-lg">
			<div className="px-5 pt-5">
				<header className="flex justify-between items-start mb-2">
					{/* Icon */}
					<img src={Icon} width="32" height="32" alt="Icon 02" />
					{/* Menu button */}
					<EditMenu className="relative inline-flex">
						<li>
							<Link
								className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
								to="#0"
							>
								Option 1
							</Link>
						</li>
						<li>
							<Link
								className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
								to="#0"
							>
								Option 2
							</Link>
						</li>
						<li>
							<Link
								className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3"
								to="#0"
							>
								Remove
							</Link>
						</li>
					</EditMenu>
				</header>
				<h2 className="text-lg font-semibold text-slate-900 mb-2">SparkleMyCar</h2>
				<div className="text-xs font-semibold text-slate-900 uppercase mb-1">Total Orders</div>
				<div className="flex items-start">
					<div className="text-3xl font-bold text-slate-900 mr-2">{total}</div>
				</div>
			</div>
			{/* Chart built with Chart.js 3 */}
			<div className="grow">
				{/* Change the height attribute to adjust the chart height */}
				<canvas ref={canvas} width={389} height={200} />
			</div>
		</div>
	);
}

export default DashboardCard02;
