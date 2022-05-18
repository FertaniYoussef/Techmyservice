import { useRef, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../cards/utils/Transition';
import api from '../../service';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

import 'react-datepicker/dist/react-datepicker.css';

const EditOrder = ({ modalOpen, setModalOpen, Order, header, change, setChange }) => {
	const center = {
		lat: 36.79443996095986,
		lng: 10.173874748222278
	};
	const [ image, setImage ] = useState(undefined);
	const modalContent2 = useRef(null);
	const OrderInput = useRef(null);
	const [ dropped, setDropped ] = useState(false);
	const [ draggable, setDraggable ] = useState(true);
	const [ position, setPosition ] = useState(center);
	const markerRef = useRef(null);
	const [ packages, setPackages ] = useState([]);
	const [ order, setOrder ] = useState({
		package: '',
		start: '',
		end: '',
		addon: [],
		adress: ''
	});
	const [ addons, setaddons ] = useState([]);

	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current;
				if (marker != null) {
					setPosition(marker.getLatLng());
				}
			}
		}),
		[]
	);
	useEffect(() => {
		modalOpen===true &&
		api
			.get('api/getpackagelist', header)
			.then((res) => {
				if (res.status == 200) {
					console.log(res.data);
					
					const temp = res.data.map((data) => ({ value: data.name, label: data.name }));
					setPackages(temp);
				}
			})
			.catch((err) => {
				console.log(err);
			});
		api
			.get('api/getaddonlist',header)
			.then((res) => {
				if (res.status == 200) {
					console.log(res.data);
					
					const temp = res.data.map((data) => ({ value: data.name, label: data.name }));
					setaddons(temp);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [Order]);

	const modifyOrder = async (e) => {
		e.preventDefault();
	
		
		api
			.put(`api/modifyorder/${Order.title}`, order, header)
			.then((response) => {
				if (response.status == 204) {
					alert("Order doesn't exist");
				} else {
					setChange(true);
					setModalOpen(false);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }) => {
			if (!modalOpen || keyCode !== 27) return;
			setModalOpen(false);
		};
		document.addEventListener('keydown', keyHandler);
		return () => document.removeEventListener('keydown', keyHandler);
	});

	useEffect(
		() => {
			change && modalOpen && OrderInput.current.focus();
		},
		[ modalOpen ]
	);

	return (
		<div>
			{' '}
			<Transition
				className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
				show={modalOpen}
				enter="transition ease-out duration-200"
				enterStart="opacity-0"
				enterEnd="opacity-100"
				leave="transition ease-out duration-100"
				leaveStart="opacity-100"
				leaveEnd="opacity-0"
				aria-hidden="true"
			/>
			{/* Modal dialog */}
			<Transition
				id={Order.id}
				className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
				role="dialog"
				aria-modal="true"
				show={modalOpen}
				enter="transition ease-in-out duration-200"
				enterStart="opacity-0 translate-y-4"
				enterEnd="opacity-100 translate-y-0"
				leave="transition ease-in-out duration-200"
				leaveStart="opacity-100 translate-y-0"
				leaveEnd="opacity-0 translate-y-4"
			>
				<div
					ref={modalContent2}
					className="bg-white overflow-auto max-w-lg w-full max-h-full rounded shadow-md overflow-hidden"
				>
					<div className="px-2 items-center">
						{/* Edit form */}

						<div className="mt-5 md:mt-0 md:col-span-2 text-left">
							<div className="shadow sm:rounded-md sm:overflow-hidden">
								<div className="px-4 py-5 bg-white space-y-6 sm:p-6">
									<div className="flex flex-col  items-center gap-6">
										<div className="flex ">
											<div>
												<div className="col-span-3 ">
													<label className="block text-sm font-medium text-gray-700">
														Package
													</label>
													<Select
														options={packages}
														onChange={(e) => {
															order.package = e.value;

															setOrder({ ...order });
														}}
													/>
												</div>
												<div className="col-span-3 ">
													<label className="block text-sm font-medium text-gray-700">
														Addons
													</label>
													<Select
														isMulti
														options={addons}
														onChange={(e) => {
															order.addon = e.map((val) => {
																return val.value;
															});

															setOrder({ ...order });
														}}
													/>
												</div>
												<div className="col-span-3 ">
													<label
														htmlFor="about"
														className="block text-sm font-medium text-gray-700"
													>
														Adress
													</label>
													<div className="mt-1">
														<input
															type="text"
															rows={3}
															value={order.adress}
															className="shadow-sm focus:ring-indigo-500   text-slate-900 focus:border-indigo-500 mt-1 block sm:text-sm border border-gray-300 rounded-md"
															placeholder={Order.adress}
															onChange={(e) => {
																order.adress = e.target.value;
																setOrder({ ...order });
															}}
														/>
													</div>
												</div>
												<div className="col-span-3 ">
													<label
														htmlFor="price"
														className="block text-sm font-medium text-gray-700"
													>
														Date of the Order
													</label>
													<DatePicker
														selected={order.start}
														onChange={(date) => {
															order.start = new Date(date);
															setOrder({ ...order });
                                                            order.end = new Date(order.start);
                                                            order.end.setHours(order.end.getHours()+1)
                                                            setOrder({ ...order });
                                                            
                                                                
														}}
														placeholderText={new Date(Order.start)}
														showTimeSelect
														timeFormat="p"
														timeIntervals={10}
														dateFormat="Pp"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="px-4 py-1 bg-gray-50 text-right sm:px-6">
								<button
									type="submit"
									className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									onClick={modifyOrder}
								>
									Save
								</button>
								<button
									type="button"
									onClick={(e) => {
										e.preventDefault();
										setModalOpen(false);
									}}
									className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			</Transition>
		</div>
	);
};

export default EditOrder;
