import { useState, useEffect } from 'react';
import api from '../service';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

const ListServices = () => {
	const history = useNavigate();
	const [ loading, setLoading ] = useState(false);
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ postsPerPage ] = useState(10);
	const [ Services, setServices ] = useState([]);
	const [ change, setChange ] = useState(false);
	const [ Service, setService ] = useState({
		name: '',
		name_2: '',
		description: '',
        admin: '',
        adress:''
	});
	const [ nom, setNom ] = useState({
		name: ''
	});
	const auth = localStorage.getItem('auth-token');
	const header = {
		headers: {
			'auth-token': auth
		}
	};
	const modifyService = async (e) => {
		e.preventDefault();
		api
			.put(`api/modifyService/${Service.name}`, Service, header)
			.then((response) => {
				if (response.status == 204) {
					alert("Service doesn't exist");
				} else {
					setChange(true);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const deleteService = async (e) => {
		e.preventDefault();
		api
			.delete(`api/deleteService?name=${nom}`, header)
			.then((response) => {
				if (response.status == 204) {
					alert('package do not exist');
				} else {
					alert('package deleted succesfuly');
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
				.get('api/getservices', header)
				.then((response) => {
					console.log(response.data);

					setServices(response.data);
					setLoading(false);
					
					setChange(false);
				})
				.catch((err) => {
					console.log(err.response);
				});
		},
		[ change ]
	);

	//get Current package
	const indexOfLastPack = currentPage * postsPerPage;
	const indexOfFirstPack = indexOfLastPack - postsPerPage;
	const currentServices = Services.slice(indexOfFirstPack, indexOfLastPack);

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
											Service
										</th>
                                        <th
											scope="col"
											class="py-3 px-6 text-xs font-medium tracking-wider text-left text-slate-900 uppercase"
										>
											Description
										</th>
										<th
											scope="col"
											class="py-3 px-6 text-xs font-medium tracking-wider text-left text-slate-900 uppercase"
										>
											Admin
										</th>
									
										<th scope="col">
											<button class="py-3 px-6 text-xs font-medium tracking-wider text-left text-slate-900 uppercase">
												Edit
											</button>
										</th>
									</tr>
								</thead>
								<tbody class="bg-white divide-y divide-gray-200  ">
									{Services.map((pack) => (
										<tr class="hover:bg-gray-100">
											
											<td class="py-4 px-6 text-sm font-medium text-slate-900 whitespace-nowrap">
												{pack.name}
											</td><td class="py-4 px-6 text-sm font-medium text-slate-900 whitespace-nowrap">
												{(pack.description==='')?<span>Has no description</span>: pack.description}
                                                </td>
											<td class="py-4 px-6 text-sm font-medium text-slate-900 whitespace-nowrap">
												{(pack.hasAdmin==false)?<span>Has no admin</span>: pack.admin.name}
                                                </td>
											<td class="py-4 pr-8 text-sm font-medium text-right whitespace-nowrap">
												<button
													onClick={() => {
														Service.name = pack.name;
														Service.description = pack.description;
													{pack.hasAdmin==true ? Service.admin=pack.admin.name:Service.admin=''}
														Service.adress = pack.adress;
														setService({ ...Service });
														console.log(Service);
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
											totalPosts={Services.length}
											paginate={paginate}
										/>
									</div>
								</tfoot>
							</table>
							<h2>modify an Service</h2>
							<div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
								<input
									value={Service.name}
									type="text"
									required
									className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 bService bService-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:bService-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Name of Service"
									onChange={(e) => {
										Service.name = e.target.value;
										setService({ ...Service });
									}}
								/>
							</div>
							<div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
								<input
									value={Service.name_2}
									type="text"
									className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 bService bService-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:bService-indigo-500 focus:z-10 sm:text-sm"
									placeholder="New Name of Package"
									onChange={(e) => {
										Service.name_2 = e.target.value;
										setService({ ...Service });
									}}
								/>
							</div>
							<div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
								<input
									value={Service.description}
									type="text"
									required
									className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 bService bService-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:bService-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Description"
									onChange={(e) => {
										Service.description = e.target.value;
										setService({ ...Service });
									}}
								/>
							</div>
							<div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
								<input
									value={Service.bill}
									type="number"
									required
									className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 bService bService-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:bService-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Price"
									onChange={(e) => {
										Service.bill = e.target.value;
										setService({ ...Service });
									}}
								/>
							</div>
							<div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
								<input
									value={Service.package}
									type="text"
									required
									className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 bService bService-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:bService-indigo-500 focus:z-10 sm:text-sm"
									placeholder="package"
									onChange={(e) => {
										Service.package = e.target.value;
										setService({ ...Service });
									}}
								/>
							</div>
							<button className="px-6 bService-2 bService-slate-900" onClick={modifyService}>
								Modify
							</button>
						</div>
						<div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
							<input
								value={nom.name}
								type="text"
								required
								className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 bService bService-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:bService-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Package name"
								onChange={(e) => {
									setNom(e.target.value);
								}}
							/>
						</div>
						<button className="px-6 bService-2 bService-slate-900" onClick={deleteService}>
							delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListServices;
