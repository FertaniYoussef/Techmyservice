import React, { useRef, useEffect } from 'react';

import Transition from './cards/utils/Transition';
import {useNavigate} from 'react-router-dom'
import {Done} from '@mui/icons-material'

const ConfirmationChange = ({
    message,
    modalOpen,
    setModalOpen,
   

}) => {
    const modalContent2 = useRef(null);
    const navigate=useNavigate()





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
                    
                        <h1 class="font-bold text-base text-slate-900 mt-5 text-center mb-1"><Done/></h1>
                        <h2 className='text-sm font-medium text-center text-green-500'>{message}</h2>
                        <div className="px-4 py-1  text-right sm:px-6">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault()
                                navigate('/login')
                                setModalOpen(false)
                               

                            }}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Okay
                        </button>
                    </div>
                    </div>
                   
                 
                </div>

           

        </Transition></div>);
}

export default ConfirmationChange;