import { useState, useEffect } from 'react';
import api from '../service';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

const ListDrivers = () => {
	const history = useNavigate();
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);
	const [Orders, setOrders] = useState([]);
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
	const addDriver = async (e) => {
		e.preventDefault();
		console.log(Driver);

		api
			.post(`api/addDriver`, Driver, header)
			.then((response) => {
				if (response.status == 11000) {
					alert('Driver already exist');
				} else {
					alert('Driver added')
					setChange(true)

				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const modifyDriver = async (e) => {
		e.preventDefault();
		api
			.put(`api/updatedriver`, Driver, header)
			.then((response) => {
				if (response.status == 204) {
					alert("Driver doesn't exist");
				} else {
					alert("Driver updated")
					setChange(true);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const deleteDriver = async (e) => {
		e.preventDefault();
		api
			.delete(`api/deleteDriver?CIN=${nom}`, header)
			.then((response) => {
				if (response.status == 204) {
					alert('Driver do not exist');
				} else {
					alert('Driver deleted succesfuly');
					setChange(true);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(
		() => {
			setLoading(true);
			api
				.get('api/getDrivers', header)
				.then((response) => {
					console.log(response.data);

					setOrders(response.data);
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
	const currentOrders = Orders.slice(indexOfFirstPack, indexOfLastPack);

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	if (loading) {
		return (
			<div class="flex items-center justify-center w-full h-full">
				<div class="flex justify-center items-center space-x-1 text-sm text-gray-700">
					<svg
						fill="none"
						class="w-6 h-6 animate-spin"
						viewBox="0 0 32 32"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							clip-rule="evenodd"
							d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
							fill="currentColor"
							fill-rule="evenodd"
						/>
					</svg>

					<div>Loading ...</div>
				</div>
			</div>
		);
	}
	return (
		<div class="max-w-2xl w-screen">
			<div class="flex flex-col">
				<div class="overflow-x-auto w-screen shadow-md sm:rounded-lg">
					<div class="inline-block min-w-scree align-middle">
						<div class="overflow-hidden ">
							<table class="min-w-screen divide-y divide-gray-200 table-fixed dark:divide-gray-700">
								<thead class="bg-gray-100">
									<tr>
										<th
											scope="col"
											class="py-3 px-6 text-xs font-medium tracking-wider text-left text-slate-900 uppercase"
										>
											CIN
										</th>
										<th
											scope="col"
											class="py-3 px-6 text-xs font-medium tracking-wider text-left text-slate-900 uppercase"
										>
											Driver
										</th>
										<th
											scope="col"
											class="py-3 px-6 text-xs font-medium tracking-wider text-left text-slate-900 uppercase"
										>
											Email
										</th>
										<th
											scope="col"
											class="py-3 px-6 text-xs font-medium tracking-wider text-left text-slate-900 uppercase"
										>
											Phone
										</th>
										<th
											scope="col"
											class="py-3 px-6 text-xs font-medium tracking-wider text-left text-slate-900 uppercase"
										>
											Adress
										</th>
										<th
											scope="col"
											class="py-3 px-6 text-xs font-medium tracking-wider text-left text-slate-900 uppercase"
										>
											Working place
										</th>
										<th
											scope="col"
											class="py-3 px-6 text-xs font-medium tracking-wider text-left text-slate-900 uppercase"
										>
											Specialité
										</th>
										<th
											scope="col"
											class="py-3 px-6 text-xs font-medium tracking-wider text-left text-slate-900 uppercase"
										>
											Verification
										</th>


										<th scope="col">
											<button class="py-3 px-6 text-xs font-medium tracking-wider text-left text-slate-900 uppercase">
												Edit
											</button>
										</th>
									</tr>
								</thead>
								<tbody class="bg-white divide-y divide-gray-200  ">
									{Orders.map((pack) => (
										<tr class="hover:bg-gray-100">
											<td class="py-4 px-6 text-sm font-medium text-slate-900 whitespace-nowrap">
												{pack.CIN}
											</td>
											<td class="py-4 px-6 text-sm font-medium text-slate-900 whitespace-nowrap">
												{pack.username}
											</td>
											<td class="py-4 px-6 text-sm font-medium text-slate-900 whitespace-nowrap">
												{pack.email}
											</td>
											<td class="py-4 px-6 text-sm font-medium text-slate-900 whitespace-nowrap">
												{pack.phone_number}
											</td>
											<td class="py-4 px-6 text-sm font-medium text-slate-900 whitespace-nowrap">
												{pack.Adress}
											</td>
											<td class="py-4 px-6 text-sm font-medium text-slate-900 whitespace-nowrap">
												{pack.WorkAt.name}
											</td>
											<td class="py-4 px-6 text-sm font-medium text-slate-900 whitespace-nowrap">
												{pack.Speciality}
											</td>
											<td class="py-4 px-6 text-sm font-medium text-slate-900 whitespace-nowrap">
												{(pack.Verified ? <span>verified</span> : <span>not verified</span>)}
											</td>
											<td class="py-4 pr-8 text-sm font-medium text-right whitespace-nowrap">
												<button
													onClick={() => {
														Driver.CIN = pack.CIN;
														Driver.email = pack.email;
														Driver.phone = pack.phone_number
														Driver.adress = pack.Adress;
														Driver.work = pack.WorkAt.name;
														Driver.specialite = pack.Speciality
														setDriver({ ...Driver });
														console.log(Driver);
													}}
													class="text-sm font-medium text-slate-900  no-underline"
												>
													Edit
												</button>
											</td>
										</tr>
									))}
								</tbody>
								<tfoot>
									<div class="flex items-center mx-auto">
										<Pagination
											postsPerPage={postsPerPage}
											totalPosts={Orders.length}
											paginate={paginate}
										/>
									</div>
								</tfoot>
							</table>
							<h2> MODIFY Driver</h2>
							<div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
								<input
									value={Driver.CIN}
									type="text"
									required
									className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 bDriver bDriver-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:bDriver-indigo-500 focus:z-10 sm:text-sm"
									placeholder="CIN of DRIVER"
									onChange={(e) => {
										Driver.CIN = e.target.value;
										setDriver({ ...Driver });
									}}
								/>
							</div>
							<div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
								<input
									value={Driver.name_2}
									type="text"
									className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 bDriver bDriver-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:bDriver-indigo-500 focus:z-10 sm:text-sm"
									placeholder="New Name of Driver"
									onChange={(e) => {
										Driver.name_2 = e.target.value;
										setDriver({ ...Driver });
									}}
								/>
							</div>
							<div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
								<input
									value={Driver.email}
									type="email"
									required
									className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 bDriver bDriver-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:bDriver-indigo-500 focus:z-10 sm:text-sm"
									placeholder="email"
									onChange={(e) => {
										Driver.email = e.target.value;
										setDriver({ ...Driver });
									}}
								/>
							</div>
							<div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
								<input
									value={Driver.work}
									type="text"
									required
									className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 bDriver bDriver-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:bDriver-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Working place"
									onChange={(e) => {
										Driver.work = e.target.value;
										setDriver({ ...Driver });
									}}
								/>
							</div>
							<div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
								<input
									value={Driver.adress}
									type="text"
									required
									className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 bDriver bDriver-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:bDriver-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Adress"
									onChange={(e) => {
										Driver.adress = e.target.value;
										setDriver({ ...Driver });
									}}
								/>
							</div>
							<div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
								<input
									value={Driver.specialite}
									type="text"
									required
									className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 bDriver bDriver-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:bDriver-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Speciality"
									onChange={(e) => {
										Driver.specialite = e.target.value;
										setDriver({ ...Driver });
									}}
								/>
							</div>
							<button className="px-6 bDriver-2 bDriver-slate-900" onClick={addDriver}>
								Add
							</button>
							<button className="px-6 bDriver-2 bDriver-slate-900" onClick={modifyDriver}>
								Modify
							</button>
						</div>
						<div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
							<input
								value={nom.name}
								type="text"
								required
								className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 bDriver bDriver-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:bDriver-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Driver CIN"
								onChange={(e) => {
									setNom(e.target.value);
								}}
							/>
						</div>
						<button className="px-6 bDriver-2 bDriver-slate-900" onClick={deleteDriver}>
							delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListDrivers;
