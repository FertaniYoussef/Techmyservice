import { useState,useEffect } from "react";
const ProfileDetails = ({user}) => {

    const [change,setChange]=useState(false)
    const [edit,setEdit]=useState(false)
  const [modified,setModified]=useState({user})

  const [date,setDate]=useState('')
  const [month,setMonth]=useState('')
  const [year,setYear]=useState('')
useEffect(() => {
  const bday=new Date(`${user.Birthday}`)
   setDate(bday.getDate())
  setMonth(bday.getMonth()+1)
  setYear(bday.getFullYear())

}, [user]);
  



    return (
        <div className="w-3/6 ml-4 h-5/6 relative overflow-hidden shadow-md bg-white  rounded-lg  shadow-lg">
                    
      <div className="px-4 py-4 sm:px-6">
          { user.role==1 ?
        <h3 className="text-lg leading-6 font-medium text-gray-900">Driver Information</h3>:
        <h3 className="text-lg leading-6 font-medium text-gray-900">Admin Information</h3>
    }
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className=" px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 cursor-pointer">{user.name} {user.prename}</dd>
          </div>

          <div className=" px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 cursor-pointer">{user.email}</dd>
          </div>
          <div className=" px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Birthday</dt>
<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 cursor-pointer">{date}/{month}/{year}</dd>
          </div>
          <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Work at</dt>
            {user.role==1 && <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 cursor-pointer">{user.WorkAt.name}</dd>}
           {user.role==2&& <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 cursor-pointer">{user.service.name}</dd>}
           {user.role==3&& <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 cursor-pointer">TechMyService</dd>}
          </div>
          <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Role</dt>
           {user.role==1 && <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 cursor-pointer">Driver</dd>}
           {user.role==2&& <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 cursor-pointer">Administrator</dd>}
           {user.role==3&& <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 cursor-pointer">Super Administrator</dd>}
          </div>
          <div className=" px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Password</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 cursor-pointer">
              ****************
            </dd>
          </div>
         
        </dl>
      </div>
        <button className="absolute bottom-4 right-10 p-2 rounded-xl text-white w-24 bg-slate-900">
          Save
        </button>

    </div>


    
      

 );
}
 
export default ProfileDetails;