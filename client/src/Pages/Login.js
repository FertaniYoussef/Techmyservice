import {useState} from 'react'
import api from '../service'
import {ArrowBack,Done,Password} from '@mui/icons-material'
import {useNavigate,useLocation, NavLink} from 'react-router-dom'
import ConfirmationChange from '../Components/ConfirmationPasswordChange'
const Login = () => {
  const location=useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpass,setConfirmpass]=useState('')
  const history=useNavigate()
  const [wrong,setWrong]=useState(false)
  const [token,setToken]=useState('')
  const [modalOpen,setModalOpen]=useState(false)
  const changePassword=async(e)=> {
    e.preventDefault()
    if (password!=confirmpass) {
      setWrong(true)
      setPassword('')
      setConfirmpass('')
    }
    else {
    api.post('/api/user/changepassword',{email,password}).then(res=>{
      if (res.status==200) {
        setWrong(false)
        setModalOpen(true)
      }
    }).catch(err=> {
      console.log({msg:err});
      
    })}
  }
  const handleVerification=async(e)=>  {
    e.preventDefault()
    api.post(`/api/verification/forgottenpassword`,{token}).then(res=> {
      if (res.status===200) {
        
        history('/forgetpassword/changepassword')
        setWrong(false)
      }
      else if (res.status===204) {
        setWrong(true)
        setToken('')


      }
    })


  }
  const handleForget=async(e)=> {


    e.preventDefault();
    api.post('/api/user/forgottenpassword',{email}).then((res)=> {
      
      if (res.status===200) {
          history('/forgetpassword/verification')
        setWrong(false)
      }
      if (res.status===204) {
        setEmail('')
        setWrong(true)
      }
    
    }).catch(err=> {
      if (err.status===404) {
        setWrong(true)
      }
      
    })

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
		
		 api.post('/api/user/login', {
				email,
				password
      }).then(async (response)=>{if (response.status===202) {
        
      localStorage.setItem('auth-token', response.data.token);
        console.log(localStorage)
                
         history('/')
			} 
        
			}).catch(err=>{
        console.log(err.response)
        const message=err.response.data
				alert(message);
        console.log(err)});
			
	};

    return (  <div className="h-screen w-screen flex  ">
      <div className={`h-screen relative w-1/2 bg-manager bg-cover bg-center	flex flex-col ${location.pathname.includes('forgetpassword') && 'translate-x-full '} 	'} duration-500	transition-transform`}>
      <div className={`my-auto w-full max-w-lg max-h-lg  mx-auto z-50 `}>
          {location.pathname.endsWith('login') && <div className={`${location.pathname.endsWith('login')? 'opacity-100   transition-opacity duration-500' : 'animate-pulse transition-opacity duration-500 opacity-0'}`}><h1 className="uppercase text-white font-extrabold	text-7xl">Welcome to techmyservice</h1>
          <p className="text-indigo-500 text-bold text-4xl">Where managing a service has never been easier</p></div>}
          {location.pathname.includes('forgetpassword') && <><h1 className="uppercase text-white font-extrabold	text-7xl">Forgotten your password ?</h1>
          <p className="text-indigo-500 text-bold text-4xl">No worry we have you covered</p></>}
        </div>
        <div className="absolute h-full opacity-25 w-full bg-indigo-400 z-0">
        </div>
        


      </div>
      <div className={`h-screen w-1/2 flex flex-col place-items-center $ relative ${location.pathname.includes('forgetpassword') && '-translate-x-full 	'} duration-500	transition-transform	 `}>
        <div className="max-w-md  w-full rounded-lg mx-auto max-h-lg my-auto  p-4 bg-">
         { location.pathname.endsWith('login') && <> <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-800 uppercase">TechMyService</h2>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-indigo-800">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <NavLink to="/forgetpassword" className="font-medium text-indigo-400 hover:text-indigo-500">
                  Forgot your password?
                </NavLink>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-[80%]  ml-8 items-center flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
          </div>
          </>}
          {
             location.pathname.endsWith('forgetpassword') && <> <div className="absolute top-2 left-2">
               <NavLink to="/login" className="text-indigo-800 no-underline hover:text-indigo-900">
               <ArrowBack/>
               </NavLink>
               </div>
               <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-800 uppercase">Reset your password</h2>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md w-[80%]  ml-8 items-center shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <p className={`text-red-500 text-xs ${wrong===false && 'hidden'}`}>Email doesn't exist</p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-[50%]  ml-8 items-center flex justify-center py-2 px-4 mx-auto border border-transparent text-sm font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                onClick={handleForget}
              >
                 Reset
              </button>
            </div>
          </div>
          </>
          }
             {
             location.pathname.endsWith('verification') && <> <div className="absolute top-2 left-2">
               <NavLink to="/login" className="text-indigo-800 no-underline hover:text-indigo-900">
               <ArrowBack/>
               </NavLink>
               </div>
               <div className="flex flex-col place-content-center w-full">
                 <div>
            <h2 className="mt-6 text-center mx-auto text-3xl font-extrabold text-indigo-800 uppercase"><Done/></h2>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md w-full   -space-y-px">
              <div className=" mx-auto">
              <input
                  type="text"
                  value={token}
                  required
                  className="appearance-none rounded-md relative block w-full px-24 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Type your verification code here"
                  onChange={(e)=>setToken(e.target.value)}
                />
                         <p className={`text-xs text-red-500  mb-4 ${wrong===false && 'hidden'}`}>Passwords non identical</p>
                <p className={`text-indigo-500 text-lg text-center `}>Verification email sent</p>
              </div>
            </div>

            <div className="flex">
              <button
                type="submit"
                className="group relative w-[50%]  ml-8 items-center flex justify-center py-2 px-4 mx-auto border border-transparent text-sm font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                onClick={handleForget}
              >
                 Resent
              </button>
              <button
                type="submit"
                className="group relative w-[50%]  ml-8 items-center flex justify-center py-2 px-4 mx-auto border border-transparent text-sm font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                onClick={handleVerification}
              >
                 Verify
              </button>
            </div>
          </div>
          </div>
          </>
          }
           {
             location.pathname.endsWith('changepassword') && <> <div className="absolute top-2 left-2">
               <NavLink to="/login" className="text-indigo-800 no-underline hover:text-indigo-900">
               <ArrowBack/>
               </NavLink>
               </div>
               <div className="flex flex-col place-content-center w-full">
                 <div>
            <h2 className="mt-6 text-center mx-auto text-3xl font-extrabold text-indigo-800   rounded-lg uppercase">Change your password</h2>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md w-full   -space-y-px">
              <div className=" mx-auto">
              <input
                  type="password"
                  value={password}
                  required
                  className="appearance-none rounded-md relative block w-full mb-4 px-24 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Type your new password "
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
              <div className=" mx-auto">
              <input
                  type="password"
                  value={confirmpass}
                  required
                  className="appearance-none rounded-md relative block w-full  px-24 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm your new password "
                  onChange={(e)=>setConfirmpass(e.target.value)}
                />
              </div>
              <p className={`text-xs text-red-500 ${wrong===false && 'hidden'}`}>Passwords non identical</p>
            </div>

            <div className="flex">
        
              <button
                type="submit"
                className="group relative w-[50%]  ml-8 items-center flex justify-center py-2 px-4 mx-auto border border-transparent text-sm font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                onClick={changePassword}
              >
                 Confirm
              </button>
            </div>
          </div>
          </div>
          <ConfirmationChange modalOpen={modalOpen} setModalOpen={setModalOpen} message="Your password has been succesfully changed"/>
          </>
       
          }
        </div>
        </div>
      </div> );
}
 
export default Login;