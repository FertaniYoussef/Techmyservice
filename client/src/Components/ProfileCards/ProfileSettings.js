import { useState,useEffect } from "react";
import PasswordConfirmation from "./PasswordConfirmation";
const ProfileSettings = ({user}) => {
  const [modalOpen,setModalOpen]=useState(false)
  const [change,setChange]=useState(false)
    const [edit,setEdit]=useState(false)
  const [modified,setModified]=useState([])
  const [confirm,setConfirm]=useState('')
  const [date,setDate]=useState('')
  const [month,setMonth]=useState('')
  const [year,setYear]=useState('')
  const [empty,setEmpty]=useState('')
useEffect(() => {
    setModified(user)
    setEmpty('')
  const bday=new Date(`${user.Birthday}`)
   setDate(bday.getDate())
  setMonth(bday.getMonth()+1)
  setYear(bday.getFullYear())
 setChange(false)
}, [user,change]);
  
const handleClick=(e)=> {
e.preventDefault()
  setModalOpen(true)

}


    return (
        <div className="w-3/6 ml-4 h-5/6 relative overflow-hidden shadow-md bg-white  rounded-lg  shadow-lg">
                    
      <div className="px-4 py-4 sm:px-6">
          { user.role==1 ?
        <h3 className="text-lg leading-6 font-medium text-gray-900">Driver Settings</h3>:
        <h3 className="text-lg leading-6 font-medium text-gray-900">Admin Settings</h3>
    }
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
    

        <div className=" px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <input type='text' value={modified.email} placeholder={modified.email} onChange={(e)=> {
              e.preventDefault();
              modified.email=e.target.value
              setModified({...modified})
            }} className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 "/>
          </div>
          <div className=" px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Birthday</dt>
<input type='date' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 " placeholder={`${date}/${month}/${year}`} onChange={(e)=> {
  e.preventDefault();
  modified.Birthday=new Date(e.target.value)
  setModified({...modified})
}}/>
          </div>


       
       
          <div className=" px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">New password</dt>
            <input type='password' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1  " placeholder={empty} onChange={(e)=> {
              modified.password=e.target.value
              setModified({...modified})
            }}/>
             
            
          </div>
    
         
        </dl>
        <PasswordConfirmation modalOpen={modalOpen} setmodalOpen={setModalOpen} modification={modified} change={change} setChange={setChange} />
      </div>
        <button onClick={handleClick} className="absolute bottom-4 right-10 p-2 rounded-xl text-white w-24 bg-slate-900">
          Save
        </button>

    </div>


    
      

 );
}
 
export default ProfileSettings;