import React, { useRef, useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Transition from '../cards/utils/Transition';
import api from '../../service';
import Confirmations from '../Confirmation';

const PasswordConfirmation = ({
    modalOpen,
    setmodalOpen,
    modification,
    change,
    setChange
}) => {
    const navigate=useNavigate()
    const modalContent2 = useRef(null);
    const packInput = useRef(null);
    const [password,setPassword]=useState('')
    const [Confirmation, setConfirmation] = useState(false)
	const auth = localStorage.getItem('auth-token');
	const header = {
		headers: {
			'auth-token': auth
		}
    };
    const handleModif=(e)=> {
        e.preventDefault()

        api
        .put('api/user/changeProfile',{modification,password},header)
        .then((res)=> {
            if (res.status===200) {
             setConfirmation(true)
       
            }
            if(res.status==400) {
                alert('Wrong User')
                setChange(true)
            }
            if (res.status==401) {
                alert('Wrong Password')
                setChange(true)
            }
            if (change==true)    {
                navigate('/Profile')
            }
        }).catch(err=> {
            console.log(err);
        })
    }


    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!modalOpen || keyCode !== 27) return;
            setmodalOpen(false);
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
                    <div className='flex h-10 mt-5 ml-4 '>
                        <h1 class="font-bold text-base text-slate-900  text-center mb-1">Confirm  your password</h1>
                        <input type='password' className='text-sm font-medium text-center mx-auto text-green-500 ' value={password} onChange={(e)=> {
                            e.preventDefault()
                            setPassword(e.target.value)
                        }} />
                        </div>
                        <div className="px-4 py-1  text-right sm:px-6">
                        <button
                            type="button"
                            onClick={handleModif}
                            className="inline-flex justify-center py-2 mt-4 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                    </div>
                    </div>
                  
            </div>
                 
            <Confirmations modalOpen2={Confirmation} setModalOpen2={setConfirmation} message="Settings modified succesfully" modalOpen={modalOpen} setModalOpen={setmodalOpen} change={change} setChange={setChange} />

           

        </Transition></div>);
}

export default PasswordConfirmation;