import { useRef, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../cards/utils/Transition';
import api from '../../service';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import Confirmations from '../Confirmation';
import 'react-datepicker/dist/react-datepicker.css';


const AssignOrder = ({ modalOpen, setModalOpen, Order, header, change, setChange }) => {
    const modalContent2 = useRef(null);
    const OrderInput = useRef(null);
    const [Drivers, setDrivers] = useState([])
    const [driver, setDriver] = useState()
    const [confirmation, setConfirmation] = useState(false)
    useEffect(() => {
        {
            modalOpen && Order.id != undefined &&
            api.get(`api/getFreeDrivers?id=${Order.id}`, header)
                .then(res => {
                    if (res.status == 200) {
                        console.log(res.data)
                        const temp = res.data.map((data) => ({ value: data.id, label: data.name }));
                        setDrivers(temp);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [modalOpen])

    const assignOrder = (e) => {
        e.preventDefault()
        api.put(`api/assignOrder?id_order=${Order.id}&id_driver=${driver}`,{}, header).then(res => {
            if (res.status == 200) {
                setConfirmation(true)
            }

        }).catch((err) => {
            console.log(err);
        });
    }


    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!modalOpen || keyCode !== 27) return;
            setModalOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    useEffect(
        () => {
            change && modalOpen && OrderInput.current.focus();
        },
        [modalOpen]
    );

    return (
        <div>
            {' '}
            <Transition
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
                id={Order.id}
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
                <div
                    ref={modalContent2}
                    className="bg-white overflow-auto my-auto max-w-lg w-full h-48 rounded shadow-md overflow-hidden"
                >
                    <div className="p-4 mx-auto my-auto items-center">
                        {/* Edit form */}






                        <div >
                            <div className="w-full ">
                                <label className="block text-sm font-medium text-gray-700">
                                    Driver
                                </label>
                                <Select
                                    options={Drivers}
                                    onChange={(e) => {
                                        setDriver(e.value)
                                    }}
                                    className="w-full"
                                />
                            </div>





                        </div>
                        <div className="px-4 pt-14 bg-gray-50 text-right sm:px-6">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={assignOrder}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setModalOpen(false);
                                }}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                    <Confirmations modalOpen2={confirmation} setModalOpen2={setConfirmation} message="Order assigned succesfully" modalOpen={modalOpen} setModalOpen={setModalOpen} change={change} setChange={setChange} />
                </div>

            </Transition>
        </div>
    );
}

export default AssignOrder;