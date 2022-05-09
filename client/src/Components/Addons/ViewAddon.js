import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../cards/utils/Transition';



const ViewAddon = ({
    modalOpen,
    setModalOpen,
    Pack
}) => {
    const modalContent2 = useRef(null);
    const packInput = useRef(null);
   




 


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
        modalOpen && packInput.current.focus();
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
           
                <div  ref={modalContent2} className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded-xl shadow-md overflow-hidden mx-auto my-auto">
                    {/* Edit form */}
                    <div ref={packInput} class="relative max-w-350px w-full bg-white  bg-no-repeat bg-top rounded-2xl shadow-2xl">
        <div class="flex flex-col items-center justify-center mt-22">
            <h1 class="font-bold text-secondary mt-5 mb-1">{Pack.name}</h1>
            <h2 class="text-text text-sm">{Pack && Pack.service.name}</h2>
        </div>
        <div class="flex justify-evenly mt-6 py-6 border border-neutral border-r-0 border-b-0 border-l-0">
            <div class="text-center">
                <h3 class="font-bold text-secondary">56</h3>
                <p class="text-xs text-text tracking-widest">Orders</p>
            </div>
            <div class="text-center">
                <h3 class="font-bold text-secondary">{Pack.supplement}</h3>
                <p class="text-xs text-text tracking-widest">Dollars</p>
            </div>
            <div class="text-center">
                <h3 class="font-bold text-secondary">125</h3>
                <p class="text-xs text-text tracking-widest">Earnings</p>
            </div>
        </div>
        <div className="px-4 py-1 bg-gray-50 text-right sm:px-6">
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
     
                </div>
           
        </Transition></div>);
}

export default ViewAddon;