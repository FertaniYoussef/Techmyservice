import {useState,useEffect} from 'react'
import api from '../service'

const ListPackages = () => {
    
    const[packs,setPacks]=useState([])


   
  useEffect(()=>{ api.get('api/getpackages').then((response)=> {

       
        setPacks(response.data)

       
       
       
        
    }).catch(err=> {
        console.log(err)
    })
    },[setPacks])
    return ( 
        
      <div>
        <table class="table-fixed">
        <thead>
    <tr>
      <th>Package</th>
      <th>Description</th>
      <th>Service</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
            {packs.map(pack=> (
                <tr>
<td key={pack.id}>{pack.name}</td>
<td >{pack.description}</td>
<td>{pack.service.name}</td>
<td>{pack.price}DT</td>
</tr>
            
            ))}
            </tbody>
            </table>   
            
        </div>
 );
}
 
export default ListPackages;