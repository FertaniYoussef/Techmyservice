import React, { useState, useRef, useEffect,useCallback } from 'react';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import Transition from '../Components/cards/utils/Transition';
import { Calendar, momentLocalizer, Views, DateLocalizer } from 'react-big-calendar'
import moment from 'moment'
import api from '../service';
import Navbar from '../Components/Navbar';
import OrderDetail from '../Components/Orders/OrderDetail';

function Calendars() {
  const history = useNavigate();
  const now = new Date()
  const location=useLocation()
	const [viewOrder, setviewOrder] = useState(false)
  const curr=useRef(null)
  const localizer = momentLocalizer(moment)
  const [myEventsList,setMyEventsList]= useState([])
const { 
 current,header}= location.state
const [user, setName] = useState({
  name: "",
  prename: ""
})
useEffect(() => {
  /**
   * What Is This?
   * This is to prevent a memory leak, in the off chance that you
   * teardown your interface prior to the timed method being called.
   */
  return () => {
    window.clearTimeout(curr?.current)
  }
}, [])
const handleClick=useCallback((e) => {
  /**
   * Here we are waiting 250 milliseconds (use what you want) prior to firing
   * our method. Why? Because both 'click' and 'doubleClick'
   * would fire, in the event of a 'doubleClick'. By doing
   * this, the 'click' handler is overridden by the 'doubleClick'
   * action.
   */
  setviewOrder(true)
  
  curr.current=e

    
}, [])



useEffect(
  () => {
      api.get('api/user', header).then((response) => {
          if (response.status == 200) {
              user.name = response.data.name
              user.prename = response.data.prename
              setName({ ...user })
          }
          else {
              history('/login')
          }
      })
  }, [setName])


  useEffect(() => {
    
if (current!=null){
   api
				.get(`api/getagendaorder?id=${current}`, header)
				.then((response) => {
					console.log(response.data);
          const temp= response.data
          temp.map((order)=> {
            order.start=new Date(order.start)
            order.end= new Date(order.end)
          })
					setMyEventsList(temp)
				})
				.catch((err) => {
					console.log(err.response);
				}); }
  }, [current]);


  return (
    <div className="Container scrollbar">
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <div className='welcomebar'>
        <Navbar user={user} />
    </div> 

<div className="w-3/5  mx-auto  scrollbar">
          
        <div className="mt-24 relative col-span-full overflow-x-auto shadow-md border border-gray-200 rounded-lg bg-indigo-50 ">
          <div className="p-2">
          <Calendar
      localizer={localizer}
      events={myEventsList}
      onSelectEvent={handleClick}
      startAccessor="start"
      endAccessor="end"
      showMultiDayTimes
      style={{ height: 500 }}
    />
          </div>
        <OrderDetail modalOpen={viewOrder} setModalOpen={setviewOrder} Order={curr.current}/>
        </div>
</div>
</div>
    </div>
  )
}

export default Calendars;