import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../cards/utils/Transition';
import { MapContainer, TileLayer,  useMap, Marker, Popup } from 'react-leaflet'
import api from '../../service';
import {Close} from '@mui/icons-material'

const OrderDetail = ({
    modalOpen,
    setModalOpen,
    Order
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

    return ( <div>  <Transition
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
           
                <div  ref={modalContent2} className=" relative bg-white overflow-auto max-w-2xl w-full max-h-full rounded-xl shadow-md overflow-hidden mx-auto my-auto">
                    {/* Edit form */}
                    <div ref={packInput} class="relative max-w-350px w-full bg-white  bg-no-repeat bg-top rounded-2xl shadow-2xl">
             
             
                    {modalOpen ? 
        <div class="flex flex-col items-center  justify-center p-2 shadow-xl ">
      <div  className=' h-64 w-full  p-2 '>
               
               <MapContainer center={[Order.localisation.coordinates[1],Order.localisation.coordinates[0]]} zoom={13} scrollWheelZoom={true}>
     <TileLayer
      
       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
     />
     <Marker position={[Order.localisation.coordinates[1],Order.localisation.coordinates[0]]}>
       <Popup>
         {Order.client.name} 
       </Popup>
     </Marker>
   </MapContainer>
               </div>
                
                
            
            
            <div  className=' w-24 h-24 '>
            <img src={`http://localhost:3001${Order.package[0].icon}`}  alt='order' className=" border-2  rounded-full border-indigo-400  h-full w-full object-cover "/>
            
            </div>
            <div className=' w-full flex flex-col place-content-between items-center	'>
            {Order.Pending===true ? <p className='uppercase bg-red-700 rounded-lg text-xs  text-center text-white p-0.5  mt-2'> Pending </p> :<p className='uppercase  text-center bg-green-700 rounded-lg text-xs  text-white p-0.5  mt-2'> Pending </p>  }
            <h1 class="font-bold  text-center text-indigo-500  uppercase ">{Order.title}</h1>
            <h2 class="text-indigo-500 text-center text-sm">Client : {Order.client.name}</h2>
            <h2 class=" text-indigo-500 text-center text-xs">Description: {Order.description}</h2>
            <h2 class=" text-indigo-500 text-center text-xs">Bill: {Order.bill} $</h2>
            </div> 
            </div>
      
        
            
        : null }
      
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

export default OrderDetail;