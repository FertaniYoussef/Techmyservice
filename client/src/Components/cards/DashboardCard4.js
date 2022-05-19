import React, { useState } from 'react';

import Image01 from './images/user-36-05.jpg';
import Image02 from './images/user-36-06.jpg';
import Image03 from './images/user-36-07.jpg';
import Image04 from './images/user-36-08.jpg';
import Image05 from './images/user-36-09.jpg';
import { useEffect } from 'react';
import api from '../../service';

function DashboardCard10() {
	const [ change, setChange ] = useState(true);
  const [customers,setCustomers]=useState([])
	const auth = localStorage.getItem('auth-token');
	const header = {
		headers: {
			'auth-token': auth
		}
	};

  useEffect(()=> {

  api.get('api/lastcustomers',header).then(res=>{
      setCustomers(res.data)
    
  }).catch(err=> {
    console.log(err);
    
  })
  },[change])

  return (
    <div className="col-span-full xl:col-span-6  bg-white  rounded-lg  shadow-lg">
      <header className="px-3 py-3 border-b border-slate-100">
        <h2 className="font-semibold  text-lg text-slate-800">Customers</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-50 bg-[#4a85e4]">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Spent</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">phone number</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {
                customers.map(customer => {
                  return (
                    <tr key={customer._id}>
                      {customer._id.map(curr=>
                      <>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            {curr.profilepic!='' &&
                            <img className="rounded-full" src={curr.profilepic} width="40" height="40" alt={curr.name} />
                          }
                          </div>
                          <div className="font-medium text-slate-800">{curr.name} {curr.prename}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{curr.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{customer.totalUnitsSold}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{curr.phone_number}</div>
                      </td>
                      </>
                      )}
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default DashboardCard10;
