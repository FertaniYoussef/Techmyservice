import {useState} from 'react'
import api from '../service'
import {useNavigate} from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history=useNavigate()
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

    return (  <div className="h-screen flex items-center bg-slate-900 justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">TechMyService</h2>
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
                  className="appearance-none rounded-md relative block w-full mb-4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                  className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="" className="font-medium text-white hover:text-sky-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-[80%]  ml-8 items-center flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div> );
}
 
export default Login;