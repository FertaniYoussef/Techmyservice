import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../cards/utils/Transition';
import api from '../../service';
import Confirmations from '../Confirmation';

const VerifyAdmins = ({
    modalOpen,
    setModalOpen,
    Admin,
    header,
    change,
    setChange
}) => {
    const modalContent2 = useRef(null);
    const packInput = useRef(null);
    const [Confirmation, setConfirmation] = useState(false)
    const verifyAdmin = async (e) => {
		e.preventDefault();
		api
			.put(`api/adminConfirmation?id=${Admin.id}`,{}, header)
			.then((response) => {
				if (response.status == 204) {
					alert('Admin do not exist');
				} else {
				setConfirmation(true)
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

            <div ref={modalContent2} className="bg-white overflow-auto max-w-xl w-full max-h-full justify-center rounded-xl shadow-md overflow-hidden mx-auto my-auto">
                {/* Edit form */}
                <div class="relative  w-full  items-center  ">
                    
                        <h1 class="font-bold text-base text-slate-900 mt-5 text-center mb-1">Do you really want to verify this Admin ?</h1>
                        <h2 className='text-sm font-medium text-center text-red-500'>This process cannot be undone</h2>
                        <div className="px-4 py-1  text-right sm:px-6">
                        <button
                            type="button"
                            onClick={verifyAdmin}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Verify
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
                   
                    <Confirmations modalOpen2={Confirmation} setModalOpen2={setConfirmation} message="Admin verified succesfully" modalOpen={modalOpen} setModalOpen={setModalOpen} change={change} setChange={setChange} />
                </div>

           

        </Transition></div>);
}

export default VerifyAdmins;