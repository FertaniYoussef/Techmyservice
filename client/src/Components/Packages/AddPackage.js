import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../cards/utils/Transition';
import api from '../../service';
import { Close } from '@mui/icons-material';

const AddPackage = ({
    modalOpen,
    setModalOpen,
    header,
    change,
    setChange
}) => {
    const [image, setImage] = useState(undefined);
    const modalContent2 = useRef(null);
    const packInput = useRef(null);
    const [dropped, setDropped] = useState(false)
    const [ Services, setServices ] = useState([]);
    

    const [pack, setPack] = useState({
        name: '',
        description: '',
        price: '',
        service:''
    });
    const wrapperRef = useRef(null);
    const onDragEnter = () => {
        wrapperRef.current.classList.add('dragover')
        setDropped(true)
    };
    const onDragLeave = () => {
        wrapperRef.current.classList.remove('dragover')
        setDropped(false)
    };
    const onDrop = () => wrapperRef.current.classList.remove('dragover');
    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            setImage(newFile)
        }
    }

    const fileRemove = (file) => {

        setImage(undefined);

    }
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
    const addPackage = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('icon', image, image);
		formData.append('pack', JSON.stringify(pack));

		api
			.post(`api/${pack.service}/addpackage`, formData, header)
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
        change && modalOpen && packInput.current.focus();
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
                                                            value={pack.name}
                                                    
                                                            ref={packInput}
                                                            className="focus:ring-indigo-500  w-96 focus:border-indigo-500 flex-1 block w-full text-slate-900 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                            placeholder="Name of Package"
                                                            
                                                            onChange={(e) => {
                                                                pack.name = e.target.value;
                                                                setPack({ ...pack });
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
                                                            value={pack.price}
                                                           
                                                            ref={packInput}
                                                            className="focus:ring-indigo-500  text-slate-900 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                            placeholder="Price of Package"
                                                            onChange={(e) => {
                                                                pack.price = e.target.value;
                                                                setPack({ ...pack });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-3 sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700">Service</label>
        <select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pack.service}
          className="focus:ring-indigo-500  text-slate-900 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
          label="Service"
          onChange={(e)=>{
              pack.service=e.target.value
              setPack({...pack})
          }}
        >   <option value=''>None</option>
            {Services.map((service) => (
          <option value={service.name}>{service.name}</option>
          ))}
        </select>
</div>
                                            </div>
                                            <div className="inline-block h-36 w-36 ml-12 col-span-1 rounded-full overflow-hidden bg-gray-100 shrink-0 mr-2 sm:mr-3 border-4 border-indigo-500">
                                             {image === undefined ? <div className="space-y-1 text-center my-10"><svg
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
                                                    </svg> </div> : <img className="mx-auto h-full w-full" src={URL.createObjectURL(image)} alt={URL.createObjectURL(image)} />}
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
                                                value={pack.description}
                                                className="shadow-sm focus:ring-indigo-500   text-slate-900 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                placeholder="Brief description of the Package"
                                                onChange={(e) => {
                                                    pack.description = e.target.value;
                                                    setPack({ ...pack });
                                                }}
                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Brief description for the package
                                        </p>
                                    </div>
                                   
 



                                    <label className="block text-sm font-medium text-gray-700">Photo</label>
                                    <div
                                        ref={wrapperRef}
                                        onDragEnter={onDragEnter}
                                        onDragLeave={onDragLeave}
                                        onDrop={onDrop}
                                        className={`mt-1 relative flex justify-center px-6 pt-5 pb-6 border-2  bg-coverborder-gray-300 ${dropped===true ? 'border-indigo-500':'border-dashed'}	  rounded-md 	`}>
                                        <div className="space-y-1 text-center">
                                            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                                {image === undefined ?

                                                    <svg
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
                                                    </svg>
                                                    : <img className="mx-auto h-12 w-12 text-gray-400 " src={URL.createObjectURL(image)} alt={URL.createObjectURL(image)} />
                                                }
                                            </span>
                                            <div className="flex text-sm text-gray-600">

                                                <p className="relative bg-transparent border-0 cursor-pointer  rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">Upload a file</p><p className="pl-1">or drag and drop</p>
                                                <input type="file" id="icon" name="icon" value="" enctype="multipart/form-data" onChange={onFileDrop} className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0	hover:border-2 hover:border-blue-900" />
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                PNG, JPG, GIF up to 10MB

                                            </p>

                                        </div>
                                    </div>
                                    {
                                        image === undefined ? (
                                            <div className="drop-file-preview">
                                                <p className="drop-file-preview__title">
                                                    Ready to upload
                                                </p>
                                            </div>
                                        ) : (<div className='flex  justify-between items-center	'><div className='mx-auto'>

                                        </div>
                                            <button className="inline-flex justify-center py-2 h-10 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={() => fileRemove(image)}>Delete</button>
                                        </div>
                                        )
                                    }

                                </div>
                                <div className="px-4 py-1 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={addPackage}
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

export default AddPackage;