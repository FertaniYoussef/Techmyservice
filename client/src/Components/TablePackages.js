import { useState, useEffect,useRef } from 'react';
import api from '../service';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

import EditPackages from './EditPackages';
const ListPackages = () => {
	const history = useNavigate();
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);
	const [packs, setPacks] = useState([]);
	const [change, setChange] = useState(false);
	const current=useRef('')
	const [searchModalOpen, setSearchModalOpen] = useState(false)
	const [packe2, setPack2] = useState({
		name: '',
		name_2: '',
		description: '',
		price: '',
		service: ''
	});
	const [nom, setNom] = useState({
		name: ''
	});
	const [image, setImage] = useState([]);
	const auth = localStorage.getItem('auth-token');
	const header = {
		headers: {
			'auth-token': auth
		}
	};

	const addPackage = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('icon', image, image);
		formData.append('pack', JSON.stringify(packe2));

		api
			.post(`api/${packe2.service}/addpackage`, formData, header)
			.then((response) => {
				if (response.status == 204) {
					alert("service doesn't exist");
				} else if (response.status == 11000) {
					alert('package already exist');
				} else {
					setChange(true);
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
					setChange(true);
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
				.get('api/getpackages')
				.then((response) => {
					setPacks(response.data);
					const reponse = response.data;
					console.log(reponse);
					const array = reponse.filter((pack) => {
						return pack.service != null;
					});

					setPacks(array);
					setLoading(false);
					packs.map((pack) => (pack.service = pack.service.name));
					setChange(false);
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
		return (
			<div className="flex items-center justify-center w-full h-full">
				<div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
					<svg
						fill="none"
						className="w-6 h-6 animate-spin"
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
		<div class="mt-24 relative col-span-full overflow-x-auto shadow-md border border-gray-200 rounded-lg bg-sky-50 ">
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
						totalPosts={packs.length}
						paginate={paginate}
					/>
				</div>

			</div>
			<div className="p-3">
				<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse table-auto">
					<thead className="text-xs uppercase text-slate-50 bg-[#4a85e4] border-b-2 border-white">
						<tr>
							<th className="p-2 ">
								<div className="font-semibold text-left">Package</div>
							</th>
							<th className="p-2">
								<div className="font-semibold text-center">Description</div>
							</th>
							<th className="p-2">
								<div className="font-semibold text-center">Service</div>
							</th>
							<th className="p-2">
								<div className="font-semibold text-center">Price</div>
							</th>
							<th scope="col" class="px-6 py-3 text-center">
								<span class="sr-only">Edit</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{packs.map((pack) => (
							<tr class="rounded-lg ">
								<th scope="row" class="px-6 py-4 font-medium text-slate-900 uppercase whitespace-nowrap">
								<div className="flex items-center">
                          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full" src={`http://localhost:3001${pack.icon}`} width="40" height="40" />
                          </div>
									{pack.name}
									</div>
								</th>
								<td class="px-6 py-4 text-center">
									{pack.description}
								</td>
								<td class="px-6 py-4 text-center">
									{pack.service.name}
								</td>
								<td class="px-6 py-4 text-blue-400 text-center">
									${pack.price}
								</td>
								<td class="px-6 py-4 text-right">
								<button
            className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3 ${searchModalOpen && 'bg-slate-200'}`}
            onClick={(e) => { e.stopPropagation(); setSearchModalOpen(true); current.current=pack }}
            aria-controls="search-modal"
          >
              <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="2" />
          <circle cx="10" cy="16" r="2" />
          <circle cx="22" cy="16" r="2" />
        </svg>
          </button>
		  <EditPackages  id={pack._id} modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} Pack={current.current} />
								</td>
							</tr>
						))}
					</tbody>
					<tfoot>



					</tfoot>
				</table>
			</div>
		</div>


		/* 			<div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
						<input
							type="file"
							required
							enctype="multipart/form-data"
							name="icon"
							className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Service"
							onChange={(e) => {
								setImage(e.target.files[0]);
							}}
						/>
					</div> */

	);
};

export default ListPackages;
