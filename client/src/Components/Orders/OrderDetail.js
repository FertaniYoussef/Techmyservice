import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../cards/utils/Transition';
import { MapContainer, TileLayer,  useMap, Marker, Popup } from 'react-leaflet'
import api from '../../service';
import {Close} from '@mui/icons-material'
import Bill from './Bill';

const OrderDetail = ({
    modalOpen,
    setModalOpen,
    Order
}) => {
    const [openTab,setOpenTab]=useState(1)
    const [viewBill,setViewBill]=useState(false)
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
    const handleClick=(e)=> {

        e.preventDefault();
        setViewBill(true)
      
    }
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
      {viewBill ===false &&
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
}
                
            
            
               <section className=" w-full text-gray-600 body-font overflow-hidden">
      <div className=" my-auto mx-auto">
        <div className=" mx-auto w-full flex flex-row">
          <div className=" w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <div className='flex w-full justify-between'>
           <div className='mx-auto'> <h2 className="text-sm title-font text-gray-500 tracking-widest">
              ORDER NAME
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium uppercase mb-4">
             {Order.title}
            </h1>
            </div>
            <div className='rounded-full h-24 w-24 my-auto mx-auto'>
          {Order.package.icon != undefined && <img className="mx-auto my-auto  rounded-full h-full w-full object-cover object-center " src={`http://localhost:3001${Order.package.icon}`}  />}
       </div>
       </div>
       <div className='w-2/3 mx-auto'>
            <div className="flex mb-4">
              <button onClick={(e)=> {
                  e.preventDefault()
                  setOpenTab(1)
              }} className={`flex-grow text-indigo-500 ${openTab===1 ?'border-b-2 border-indigo-500':'border-b-2 border-gray-300'} py-2 text-lg px-1 no-underline	`}>
                Description
              </button>
              <button  onClick={(e)=> {
                  e.preventDefault()
                  setOpenTab(2)
              }} className={`flex-grow text-indigo-500 ${openTab===2 ?'border-b-2 border-indigo-500':'border-b-2 border-gray-300'} py-2 text-lg px-1 no-underline	`}>
                Details
              </button>
              <button  onClick={(e)=> {
                  e.preventDefault()
                  setOpenTab(3)
              }} className={`flex-grow text-indigo-500 ${openTab===3 ?'border-b-2 border-indigo-500':'border-b-2 border-gray-300'} py-2 text-lg px-1 no-underline	`}>
                Addons
              </button>
            </div>
            <div className="flex"/>
            <div className={openTab!=1 && 'hidden'}>
                <div id="description" role="tabpanel" aria-labelledby="description-tab">
            <p className="leading-relaxed mb-4">
            {Order.description}
            </p>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Package</span>
              <span className="ml-auto text-gray-900">{Order.package.name}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Client</span>
              <span className="ml-auto text-gray-900">{Order.client.name} {Order.client.prename}</span>
            </div>
            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
              <span className="text-gray-500">Email</span>
              <span className="ml-auto text-gray-900">{Order.client.email}  </span>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${Order.bill}
              </span>
              <button 
              onClick={handleClick}
              className={`flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded no-underline`}>
                Generate Bill
              </button>
              </div>
              </div>
</div>

              <div className={`${openTab!=2 &&'hidden'} w-full`}>
            <p className="leading-relaxed mb-4">
           
            </p>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Driver</span>
              <span className="ml-auto text-gray-900 uppercase">{Order.driver!=undefined ?Order.driver.name:null}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Service</span>
              <span className="ml-auto text-gray-900 uppercase">{Order.service.name}</span>
            </div>
            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
              <span className="text-gray-500">Status</span>
              <span className="ml-auto text-gray-900">{Order.Pending===true ? <span className='cursor-pointer text-red-400'>Pending</span> : <span className='cursor-pointer text-green-400'>Completed</span> }</span>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
              ${Order.bill}
              </span>
              <button    onClick={handleClick} className={`flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded`}>
                Generate Bill
              </button>
              </div>
              </div>
              <div className={`${openTab!=3 &&'hidden'} w-full`}>
            <p className="leading-relaxed mb-4">
            <span className='cursor-none text-green-400'>{Order.addon.length} Addons</span> 
            </p>
            <div className='overflow-y-auto'>
            {Order.addon.length>0 &&
            Order.addon.map((add)=> {
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">{add.name}</span>
              <span className="ml-auto text-gray-900">{add.supplement}</span>
            </div>
            })}
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
              ${Order.bill}
              </span>
              <button     onClick={handleClick} className={`flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded`}>
                Generate Bill
              </button>
              </div>
              </div>
             </div>
             </div>
       
        </div>
    </div>
    </section>
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
                <Bill BillOpen={viewBill} setBillOpen={setViewBill} invoice={Order}/>
        </Transition></div>);
}

export default OrderDetail;