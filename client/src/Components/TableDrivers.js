import { useState, useEffect,useRef } from 'react';
import api from '../service';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';
import { Edit, Visibility, Delete,Add,CalendarToday } from '@mui/icons-material';
import Calendar from 'react-calendar'

const ListDrivers = () => {
	const history = useNavigate();
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);
	const [Drivers, setDrivers] = useState([]);
	const current = useRef('')
	const [change, setChange] = useState(false);
	const [Driver, setDriver] = useState({
		CIN: '',
		name_2: '',
		phone: '',
		email: '',
		work: '',
		adress: '',
		specialite: ''
	});
	const [nom, setNom] = useState({
		name: ''
	});
	const auth = localStorage.getItem('auth-token');
	const header = {
		headers: {
			'auth-token': auth
		}
	};
	// const addDriver = async (e) => {
	// 	e.preventDefault();
	// 	console.log(Driver);

	// 	api
	// 		.post(`api/addDriver`, Driver, header)
	// 		.then((response) => {
	// 			if (response.status == 11000) {
	// 				alert('Driver already exist');
	// 			} else {
	// 				alert('Driver added')
	// 				setChange(true)

	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };
	// const modifyDriver = async (e) => {
	// 	e.preventDefault();
	// 	api
	// 		.put(`api/updatedriver`, Driver, header)
	// 		.then((response) => {
	// 			if (response.status == 204) {
	// 				alert("Driver doesn't exist");
	// 			} else {
	// 				alert("Driver updated")
	// 				setChange(true);
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };
	// const deleteDriver = async (e) => {
	// 	e.preventDefault();
	// 	api
	// 		.delete(`api/deleteDriver?CIN=${nom}`, header)
	// 		.then((response) => {
	// 			if (response.status == 204) {
	// 				alert('Driver do not exist');
	// 			} else {
	// 				alert('Driver deleted succesfuly');
	// 				setChange(true);
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	useEffect(
		() => {
			setLoading(true);
			api
				.get('api/getDrivers', header)
				.then((response) => {
					console.log(response.data);

					setDrivers(response.data);
					setLoading(false);

					setChange(false);
				})
				.catch((err) => {
					console.log(err.response);
				});
		},
		[change]
	);

	//get Current package
	const indexOfLastPack = currentPage * postsPerPage;
	const indexOfFirstPack = indexOfLastPack - postsPerPage;
	const currentDrivers = Drivers.slice(indexOfFirstPack, indexOfLastPack);

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	if (loading) {
		return (
			<div className="flex mt-48  justify-center w-full h-full">
				<div class="text-center">
					<svg role="status" class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
						<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
					</svg>
				</div>
			</div>
		);
	}
	return (
		<div class="mt-24 relative col-span-full overflow-x-auto shadow-md border border-gray-200 rounded-lg bg-indigo-50 ">
			<div class="p-2 flex justify-between">
				<label for="table-search" class="sr-only">Search</label>
				<div class="relative mt-1">
					<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path className="fill-current text-slate-500" d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
							<path className="fill-current text-slate-400" d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" /></svg>
					</div>
					<input type="text" id="table-search" class="bg-slate-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5 " placeholder="Search for items" />
				</div>

				<div className='pt-2.5 text-right w-full'>

					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={Drivers.length}
						paginate={paginate}
					/>
				</div>

			</div>
			<div className="p-3">
				<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse table-auto">
					<thead className="text-xs uppercase text-slate-50 bg-indigo-500 ">
						<tr>
						<th className="p-2 ">
								<div className="font-semibold text-left">CIN</div>
							</th>
							<th className="p-2 ">
								<div className="font-semibold text-center">Driver</div>
							</th>
							<th className="p-2">
								<div className="font-semibold text-center">Service</div>
							</th>
							<th className="p-2">
								<div className="font-semibold text-center">Speciality</div>
							</th>
							<th className="p-2">
								<div className="font-semibold text-center">Verification</div>
							</th>
							<th class="p-2">
								<div className="font-semibold text-center">Status</div>
							</th>
							<th class="p-2">
								<div className="font-semibold text-center">Planning</div>
							</th>
							
							<th class="p-2">
								<div className="font-semibold text-center">Options</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{Drivers.map((pack) => (
							<tr class="rounded-lg ">
								<td class="px-6 py-4 text-slate-700 text-center">
									{pack.CIN}
								</td>
								<th scope="row" class="px-6 py-4 font-medium text-slate-900 uppercase whitespace-nowrap">
									<div className="flex items-center">
										<div className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100 w-10 h-10 shrink-0 mr-2 sm:mr-3">
										{pack.icon===undefined ?<svg
                                                        className="mx-auto h-12 w-12 text-gray-400"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 48 48"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>:<img className="mx-auto h-12 w-12" src={`http://localhost:3001${pack.icon}`} width="40" height="40" />}
										</div>
										{pack.name} {pack.prename}
									</div>
								</th>
								<td class="px-6 py-4 text-slate-700 text-center">
									{pack.WorkAt.name}
								</td>
								<td class="px-6 py-4 text-slate-700 text-center">
										{pack.Speciality}
										</td>
								<td class="px-6 py-4  text-center">
									{pack.Verified ? <div className='text-green-800 font-bold'>Verified</div>:<div className='text-red-800 font-bold'>Pending</div> }
								</td>
							
								<td class="px-6 py-4 text-center">
									{pack.isFree ? <div className='text-green-800 font-bold'>Free</div>:<div className='text-red-800 font-bold'>Working</div> }
								</td>
								<td class="px-6 py-4  text-center">
								<button
										className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3 `}
										onClick={(e) => { e.stopPropagation(); current.current = pack; }}
										aria-controls="search-modal"
									>
										<CalendarToday />
									</button>
								</td>
								<td class=" py-4 justify-center items-right flex">

									<button
										className={`w-8 h-8 flex items-right justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3 `}
										onClick={(e) => { e.stopPropagation();current.current = pack; }}
										aria-controls="search-modal"
									>
										<Edit />
									</button>
									<button
										className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3 `}
										onClick={(e) => { e.stopPropagation(); current.current = pack; }}
										aria-controls="search-modal"
									>
										<Visibility />
									</button>
									<button
										className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3 `}
										onClick={(e) => { e.stopPropagation(); current.current = pack; }}
										aria-controls="search-modal"
									>
										<Delete className='text-red-400' />
									</button>
								</td>
							</tr>
						))}
					</tbody>
					<tfoot>

					<tr >
						<td colSpan={7} >
						<button
										className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full mx-auto mt-5`}
										onClick={(e) => { e.stopPropagation(); }}
										aria-controls="search-modal"
									>
										<Add className='text-green-400' />
									</button>
								
						</td>
					</tr>

					</tfoot>
				</table>
			</div>

		</div>




	);
};

export default ListDrivers;
