
const ProfileDetails = ({user}) => {



    return (
        <div className="w-4/6 ml-4 h-full shadow overflow-hidden sm:rounded-lg bg-indigo-100">
                    
      <div className="px-4 py-5 sm:px-6">
          { user.role==1 ?
        <h3 className="text-lg leading-6 font-medium text-gray-900">Driver Information</h3>:
        <h3 className="text-lg leading-6 font-medium text-gray-900">Admin Information</h3>
    }
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.name} {user.prename}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Role</dt>
           {user.role==1 && <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Driver</dd>}
           {user.role==2&& <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Administrator</dd>}
           {user.role==3&& <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Super Administrator</dd>}
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Work at</dt>
            {user.role==1 && <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.WorkAt}</dd>}
           {user.role==2&& <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.service}</dd>}
           {user.role==3&& <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">TechMyService</dd>}
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">About</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
              qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
              pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
            </dd>
          </div>
         
        </dl>
      </div>
    </div>


    
      

 );
}
 
export default ProfileDetails;