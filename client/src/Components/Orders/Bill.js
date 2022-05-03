import { Fragment,useEffect,useState,useRef } from "react";
import {PDFViewer} from '@react-pdf/renderer'
import Invoice from "../Invoice/Invoice";
import Transition from '../cards/utils/Transition';
import {useLocation,useNavigate } from 'react-router-dom';
import api from "../../service";
import Navbar
 from "../Navbar";
const Bill = ({   BillOpen,
    setBillOpen,
    invoice}) => {
        const modalContent3 = useRef(null);
        const packInput2 = useRef(null);

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!BillOpen || keyCode !== 27) return;
            setBillOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });
  
    return (  
        <div className="z-99 absolute">  <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={BillOpen}
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
            show={BillOpen}
            enter="transition ease-in-out duration-200"
            enterStart="opacity-0 translate-y-4"
            enterEnd="opacity-100 translate-y-0"
            leave="transition ease-in-out duration-200"
            leaveStart="opacity-100 translate-y-0"
            leaveEnd="opacity-0 translate-y-4"
        >
           
                <div  ref={modalContent3} className=" relative bg-white overflow-auto  w-fit h-full scrollbar rounded-xl shadow-md overflow-y-auto mx-auto my-auto">
                    {/* Edit form */}
                    <div ref={packInput2} class="relative max-w-350px w-full bg-white  bg-no-repeat bg-top overflow-y-auto rounded-2xl shadow-2xl">
    {BillOpen===true &&
      <Fragment>
        <PDFViewer width="1000" height="1000" className="scrollbar overflow-hidden" >
            <Invoice invoice={invoice}/>
        </PDFViewer>
    </Fragment> }
</div></div>
</Transition>
</div>
    );
}
 
export default Bill;