import { useState, useEffect } from 'react';
import api from '../service';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

const ListPackages = () => {
	const history = useNavigate();
	const [ loading, setLoading ] = useState(false);
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ postsPerPage ] = useState(10);
    const [ packs, setPacks ] = useState([]);
    const [change,setChange]=useState(false)
	const [ packe2, setPack2 ] = useState({
		name: '',
		name_2: '',
		description: '',
		price: '',
		service: ''
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

	const addPackage = async (e) => {
		e.preventDefault();
		api
			.post(`api/${packe2.service}/addpackage`, packe2, header)
			.then((response) => {
				if (response.status == 204) {
					alert("service doesn't exist");
				} else if (response.status == 11000) {
					alert('package already exist');
				} else {
					setChange(true)
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const modifyPackage = async (e) => {
		e.preventDefault();
		api
			.put('api/updatepackage', packe2, header)
			.then((response) => {
				if (response.status == 204) {
					alert("package doesn't exist");
				} else {
					setChange(true)
				}
			})
			.catch((err) => {
				console.log(err);
			});
    };
	const deletePackage = async (e) => {
		e.preventDefault();
		console.log(nom);
		
		api
			.delete(`api/deletepackage?name=${nom}`, header)
			.then((response) => {
				if (response.status == 204) {
					alert('package do not exist');
				} else {
					alert('package deleted succesfuly');
					setChange(true)
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
				.get('api/getpackages')
				.then((response) => {
					setPacks(response.data);
					const array=packs.filter((pack)=> pack.service!=null)
					setPacks(array)
                    setLoading(false);
                    packs.map((pack)=> pack.service=pack.service.name)
                    setChange(false)
                })
                
				.catch((err) => {
					console.log(err);
				});
		},
		[change]
	);

	//get Current package
	const indexOfLastPack = currentPage * postsPerPage;
	const indexOfFirstPack = indexOfLastPack - postsPerPage;
	const currentPacks = packs.slice(indexOfFirstPack, indexOfLastPack);

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	if (loading) {
		return <div class="flex items-center justify-center w-full h-full">
        <div class="flex justify-center items-center space-x-1 text-sm text-gray-700">
             
                    <svg fill='none' class="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                        <path clip-rule='evenodd'
                            d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                            fill='currentColor' fill-rule='evenodd' />
                    </svg>
    
             
            <div>Loading ...</div>
        </div>
    </div>;
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
										<th scope="col" class="p-4" />
										<th
											scope="col"
											class="py-3 px-6 text-xs font-medium tracking-wider text-left text-slate-900 uppercase"
										>
											Package
										</th>
										<th
											scope="col"
											class="py-3 px-6 text-xs font-medium tracking-wider text-left text-slate-900 uppercase"
										>
											Descripton
										</th>
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
											Price
										</th>
										<th scope="col">
											<button class="py-3 px-6 text-xs font-medium tracking-wider text-left text-slate-900 uppercase">
												Add
											</button>
										</th>
									</tr>
								</thead>
								<tbody class="bg-white divide-y divide-gray-200  ">
									{packs.map((pack) => (
										<tr class="hover:bg-gray-100">
											<td class="p-4 w-4" />
											<td class="py-4 px-6 text-sm font-medium text-slate-900 whitespace-nowrap">
												{pack.name}
											</td>
											<td class="py-4 px-6 text-sm font-medium text-slate-900 whitespace-nowrap">
												{pack.description}
											</td>
											<td class="py-4 px-6 text-sm font-medium text-slate-900 whitespace-nowrap">
												{pack.service.name}
											</td>
											<td class="py-4 px-6 text-sm font-medium text-slate-900 whitespace-nowrap">
												{pack.price} DT
											</td>
											<td class="py-4 pr-8 text-sm font-medium text-right whitespace-nowrap">
                                                <button onClick={()=>{
                                            
                                                packe2.name=pack.name
                                                packe2.description=pack.description
                                                packe2.price=pack.price
                                                packe2.service=pack.service.name
                                                setPack2({...packe2})}} class="text-sm font-medium text-slate-900  no-underline">
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
											totalPosts={packs.length}
											paginate={paginate}
										/>
									</div>
								</tfoot>
							</table>
							<h2>Add or modify a package</h2>
							<div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
								<input
									value={packe2.name}
									type="text"
									required
									className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Name of Package"
									onChange={(e) => {
										packe2.name = e.target.value;
										setPack2({ ...packe2 });
									}}
								/>
							</div>
							<div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
								<input
									value={packe2.name_2}
									type="text"
									className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="New Name of Package"
									onChange={(e) => {
										packe2.name_2 = e.target.value;
										setPack2({ ...packe2 });
									}}
								/>
							</div>
							<div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
								<input
									value={packe2.description}
									type="text"
									required
									className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Description"
									onChange={(e) => {
										packe2.description = e.target.value;
										setPack2({ ...packe2 });
									}}
								/>
							</div>
							<div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
								<input
									value={packe2.price}
									type="number"
									required
									className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Price"
									onChange={(e) => {
										packe2.price = e.target.value;
										setPack2({ ...packe2 });
									}}
								/>
							</div>
							<div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
								<input
									value={packe2.service}
									type="text"
									required
									className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Service"
									onChange={(e) => {
										packe2.service = e.target.value;
										setPack2({ ...packe2 });
									}}
								/>
							</div>
							<button className="px-6 border-2 border-slate-900" onClick={addPackage}>
								Add
							</button>
							<button className="px-6 border-2 border-slate-900" onClick={modifyPackage}>
								Modify
							</button>
						</div>
						<div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
							<input
								value={nom.name}
								type="text"
								required
								className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Package name"
								onChange={(e) => {
									setNom(e.target.value);
								}}
							/>
						</div>
						<button className="px-6 border-2 border-slate-900" onClick={deletePackage}>
							delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListPackages;
