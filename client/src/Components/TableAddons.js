import { useState, useEffect, useRef } from 'react';
import api from '../service';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';
import { Edit, Visibility, Delete,Add } from '@mui/icons-material';

import EditAddons from './Addons/EditAddon';
 import ViewAddon from './Addons/ViewAddon';
import DeleteAddon from './Addons/DeleteAddon';
import AddAddon from './Addons/AddAddons'

const ListAddons = () => {
	const history = useNavigate();
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);
	const [addons, setaddons] = useState([]);
	const [change, setChange] = useState(false);
	const current = useRef('')
	const [search,setSearch]=useState('')
	const [editAddon, setEditAddon] = useState(false)
	const [viewAddon, setViewAddon] = useState(false)
	const [deleteAddon, setDeleteAddon] = useState(false)
	const [addAddon, setaddAddon] = useState(false);
	const auth = localStorage.getItem('auth-token');
	const header = {
		headers: {
			'auth-token': auth
		}
	};

	

	useEffect(
		() => {
			setLoading(true);
			api
				.get('api/getaddonlist',header)
				.then((response) => {
					setaddons(response.data);
					const reponse = response.data;
					
					const array = reponse.filter((pack) => {
						return pack.service != null;
					});
					setaddons(array);
					setLoading(false);
		
					setChange(false);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		[change]
	);
	//get Current Addon
	const indexOfLastPack = currentPage * postsPerPage;
	const indexOfFirstPack = indexOfLastPack - postsPerPage;
	const currentaddons = addons.slice(indexOfFirstPack, indexOfLastPack);

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
		<div class="mt-24 relative w-11/12  mx-auto overflow-x-auto shadow-md bg-white  rounded-sm  shadow-lg">
			<div class="p-2 flex justify-between">
				<label for="table-search" class="sr-only">Search</label>
				<div class="relative mt-1">
					<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path className="fill-current text-slate-500" d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
							<path className="fill-current text-slate-400" d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" /></svg>
					</div>
					<input type="text" id="table-search" class="bg-slate-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5 " placeholder="Search for items" onChange={(e)=> {
						e.preventDefault();
						setSearch(e.target.value)
					}} /></div>

				<div className='pt-2.5 text-right w-full'>

					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={addons.length}
						paginate={paginate}
					/>
				</div>

			</div>
			<div className="p-3">
				<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse table-auto">
					<thead className="text-xs uppercase text-slate-50 bg-indigo-500 ">
						<tr>
							<th className="p-2 ">
								<div className="font-semibold text-left">Addon</div>
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
							<th class="p-2">
								<div className="font-semibold text-center">Options</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{addons.filter((pack,index)=> 
						 pack.name.toLowerCase().includes(search.toLowerCase())
						).map((pack) => (
							<tr class="rounded-lg ">
								<th scope="row" class="px-6 py-4 font-medium text-slate-900 uppercase whitespace-nowrap">
									<div className="flex items-center">
										{pack.name}
									</div>
								</th>
								<td class="px-6 py-4 text-center">
									{pack.description}
								</td>
								<td class="px-6 py-4 text-center">
									{pack.service!=undefined ?pack.service.name : <span className="text-red-500">No Service </span>}
								</td>
								<td class="px-6 py-4 text-blue-400 text-center">
									${pack.supplement}
								</td>
								<td class=" py-4 justify-center items-right flex">

									<button
										className={`w-8 h-8 flex items-right justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3 ${editAddon && 'bg-slate-200'}`}
										onClick={(e) => { e.stopPropagation(); setEditAddon(true); current.current = pack; }}
										aria-controls="search-modal"
									>
										<Edit />
									</button>
									<button
										className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3 ${viewAddon && 'bg-slate-200'}`}
										onClick={(e) => { e.stopPropagation(); setViewAddon(true); current.current = pack; }}
										aria-controls="search-modal"
									>
										<Visibility />
									</button>
									<button
										className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3 ${viewAddon && 'bg-slate-200'}`}
										onClick={(e) => { e.stopPropagation(); setDeleteAddon(true); current.current = pack; }}
										aria-controls="search-modal"
									>
										<Delete className='text-red-400' />
									</button>
									
								</td>
							</tr>
						))}
						 <EditAddons modalOpen={editAddon} setModalOpen={setEditAddon} Pack={current.current} header={header} change={change} setChange={setChange} />
								<ViewAddon modalOpen={viewAddon} setModalOpen={setViewAddon} Pack={current.current} />
									<DeleteAddon modalOpen={deleteAddon} setModalOpen={setDeleteAddon} Pack={current.current} header={header} change={change} setChange={setChange} />
					</tbody>
					<tfoot>

					<tr >
						<td colSpan={5} >
						<button
										className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full mx-auto ${addAddon && 'bg-slate-200'}`}
										onClick={(e) => { e.stopPropagation(); setaddAddon(true); }}
										aria-controls="search-modal"
									>
										<Add className='text-green-400' />
									</button>
									<AddAddon modalOpen={addAddon} setModalOpen={setaddAddon} header={header} change={change} setChange={setChange}/> 
						</td>
					</tr>

					</tfoot>
				</table>
			</div>

		</div>




	);
};

export default ListAddons;
