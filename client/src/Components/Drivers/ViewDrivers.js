import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../cards/utils/Transition';
import { MapContainer, TileLayer,  useMap, Marker, Popup } from 'react-leaflet'
import api from '../../service';

const ViewDrivers = ({
    modalOpen,
    setModalOpen,
    Driver,
    Position,
    header
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
                    {modalOpen ?
                    <div ref={packInput} class="relative max-w-350px w-full bg-white  bg-no-repeat bg-top rounded-2xl shadow-2xl">
        <div class="flex flex-col items-center justify-center ">
            <div  className=' h-48 w-full border-b-2 border-indigo-400 '>
              
            <MapContainer center={[Position[1],Position[0]]} zoom={13} scrollWheelZoom={true}>
  <TileLayer
   
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[Position[1],Position[0]]}>
    <Popup>
      {Driver.name} 
    </Popup>
  </Marker>
</MapContainer>
            </div>
            <div  className=' h-24 w-24  rounded-full  mt-5 '>
            {Driver.profilepic === ''? <div className="space-y-1 text-center my-10"><svg
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
                                                    </svg> </div> :
            <img src={`http://localhost:3001${Driver.profilepic}`}  alt="Profile Picture" class="  border-indigo-400 border-2 rounded-full h-full w-full "/>}
            
            </div>
            <h1 class="font-bold text-secondary  mb-5">{Driver.name} {Driver.prename}</h1>
            <h2 class="text-text text-sm">{Driver.WorkAt.name}</h2>
            <h4 class="text-text text-sm">{Driver.Adress}</h4>
        </div>
        <div class="flex justify-evenly mt-6 py-6 border border-neutral border-r-0 border-b-0 border-l-0">
            <div class="text-center">
                <h3 class="font-bold text-secondary">{Driver.Speciality}</h3>
                
            </div>
            <div class="text-center">
                <h3 class="font-bold text-secondary ">{Driver.CIN}</h3>
              
            </div>
            <div class="text-center">
                <h3 class="font-bold text-secondary">{Driver.phone_number}</h3>
               
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
    </div>  : null}
     
                </div>
           
        </Transition></div>);
}

export default ViewDrivers;