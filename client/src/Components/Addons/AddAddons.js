import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../cards/utils/Transition';
import api from '../../service';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Close } from '@mui/icons-material';

const AddAddon = ({
    modalOpen,
    setModalOpen,
    header,
    change,
    setChange
}) => {

    const modalContent2 = useRef(null);
    const AddonInput = useRef(null);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    const [ Services, setServices ] = useState([]);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    const [Addon, setAddon] = useState({
        name: '',
        description: '',
        supplement: '',                                                                         
        service:''
    });

    useEffect(
		() => {
			api
				.get('api/getservices', header)
				.then((response) => {
					console.log(response.data);

					setServices(response.data);
				})
				.catch((err) => {
					console.log(err.response);
				});
		},
		[ modalOpen ]
	);
    const AddAddon = async (e) => {
		e.preventDefault();

		api
			.post(`api/${Addon.service}/addaddon`, Addon, header)
			.then((response) => {
				if (response.status == 204) {
					alert("Addon doesn't exist");
				} else if (response.status == 11000) {
					alert('Addon already exist');
				} else {
					setChange(true);
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

    useEffect(() => {
        change && modalOpen && AddonInput.current.focus();
    }, [modalOpen]);

    return (<div>  <Transition
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
            <div ref={modalContent2} className=" relative bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-md overflow-hidden">
            <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-5 lg:right-8"
                  onClick={() => setModalOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <Close className="h-6 w-6 text-black"/>
                </button>
                <div className="px-2">
                    {/* Edit form */}

                    <div className="mt-5 md:mt-0 md:col-span-2 text-left">
                        <form action="#" method="POST">
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div className="grid grid-cols-4 gap-6">
                                        <div className='flex '>
                                            <div>
                                                
                                                <div className="col-span-3 sm:col-span-2">
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                        Name 
                                                    </label>
                                                    <div className="mt-1 flex w-96 rounded-md shadow-sm">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={Addon.name}
                                                    
                                                            ref={AddonInput}
                                                            className="focus:ring-indigo-500  w-96 focus:border-indigo-500 flex-1 block w-full text-slate-900 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                            placeholder="Name of Addon"
                                                            
                                                            onChange={(e) => {
                                                                Addon.name = e.target.value;
                                                                setAddon({ ...Addon });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-3 sm:col-span-2">
                                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                                        Price
                                                    </label>
                                                    <div className="mt-1 flex w-96 rounded-md shadow-sm">
                                                        <input
                                                            type="number"
                                                            name="price"
                                                            value={Addon.supplement}
                                                           
                                                            ref={AddonInput}
                                                            className="focus:ring-indigo-500  text-slate-900 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                            placeholder="Price of Addon"
                                                            onChange={(e) => {
                                                                Addon.supplement = e.target.value;
                                                                setAddon({ ...Addon });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-3 sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700">Service</label>
        <select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Addon.service}
          className="focus:ring-indigo-500  text-slate-900 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
          label="Service"
          onChange={(e)=>{
              Addon.service=e.target.value
              setAddon({...Addon})
          }}
        >   <option value=''>None</option>
            {Services.map((service) => (
          <option value={service.name}>{service.name}</option>
          ))}
        </select>
</div>
                                            </div>
                                        
                                        </div>
                                    </div>

                                    <div className="col-span-3 sm:col-span-2">
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                id="about"
                                                name="about"
                                                rows={3}
                                                value={Addon.description}
                                                className="shadow-sm focus:ring-indigo-500   text-slate-900 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                placeholder="Brief description of the Addon"
                                                onChange={(e) => {
                                                    Addon.description = e.target.value;
                                                    setAddon({ ...Addon });
                                                }}
                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Brief description for the Addon
                                        </p>
                                    </div>
                                   
 



                                  </div>
                                <div className="px-4 py-1 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={AddAddon}
                                    >
                                        Save
                                    </button>
                            
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Transition></div>);
}

export default AddAddon;