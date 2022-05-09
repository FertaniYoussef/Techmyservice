import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../cards/utils/Transition';
import api from '../../service';


const EditAddon = ({
    modalOpen,
    setModalOpen,
    Pack,
    header,
    change,
    setChange
}) => {
    const modalContent2 = useRef(null);
    const packInput = useRef(null);
    const [dropped, setDropped] = useState(false)



    const [pack, setPack] = useState({
        id: '',
        name: '',
        description: '',
        supplement: '',
    });

  
    const modifyAddon = async (e) => {
        e.preventDefault();
       
        setPack({ ...pack })
        api
            .put(`api/${Pack.service.name}/editaddon?id=${Pack._id}`, pack, header)
            .then((response) => {
                if (response.status == 204) {
                    alert("Addon doesn't exist");
                } else {
                    setChange(true);
                    setModalOpen(false)
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
            id={Pack.id}
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
            <div ref={modalContent2} className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-md overflow-hidden">
                <div className="px-2">
                    {/* Edit form */}

                    <div className="mt-5 md:mt-0 md:col-span-2 mx-auto  text-left">
                        <form action="#" method="POST">
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5  mx-auto  w-full bg-white space-y-6 sm:p-6">
                                    
                                       
                                         <div className="mx-auto">
                                                
                                              
                                                    <label htmlFor="name" className="block mx-auto text-sm font-medium text-gray-700">
                                                        Name 
                                                    </label>
                                                    <div className="mt-1 flex w-96  rounded-md shadow-sm">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={pack.name}
                                                            id={Pack.id}
                                                            ref={packInput}
                                                            className="focus:ring-indigo-500  w-96 focus:border-indigo-500 flex-1 block w-full text-slate-900 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                            placeholder={Pack.name}
                                                            defaultValue={Pack.name}
                                                            onChange={(e) => {
                                                                pack.name = e.target.value;
                                                                setPack({ ...pack });
                                                            }}
                                                        />
                                                    </div>
                                            
                                      
                                                    <label htmlFor="supplement" className="block text-sm font-medium text-gray-700">
                                                        price 
                                                    </label>
                                                    <div className="mt-1 flex w-96 rounded-md shadow-sm">
                                                        <input
                                                            type="number"
                                                            name="supplement"
                                                            value={pack.supplement}
                                                            id={Pack.id}
                                                            ref={packInput}
                                                            className="focus:ring-indigo-500  text-slate-900 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                            placeholder={Pack.supplement}
                                                            defaultValue={Pack.supplement}
                                                            onChange={(e) => {
                                                                pack.supplement = e.target.value;
                                                                setPack({ ...pack });
                                                            }}
                                                        />
                                                    
                                                </div>
                                           
                                           
                                        
                                 

                                
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <div className="mt-1 w-96">
                                            <textarea
                                                id="about"
                                                name="about"
                                                rows={3}
                                                value={pack.description}
                                                className="shadow-sm focus:ring-indigo-500   text-slate-900 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                placeholder={Pack.description}
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
                                   </div>
                                <div className="px-4 py-1 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={modifyAddon}
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setModalOpen(false);

                                        }}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Transition></div>);
}

export default EditAddon;