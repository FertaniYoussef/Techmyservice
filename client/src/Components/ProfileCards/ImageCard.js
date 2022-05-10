import UserAvatar from '../../images/pdp.png';
const ImageCard = ({user}) => {



    return (
        

    
      
        <div className="inline-block h-80 w-80 rounded-xl  overflow-hidden    shrink-0 ">
           {user.profilepic=='' ?<img className="w-full h-full   mx-auto" src={UserAvatar}   alt="User" /> : <img className="mx-auto object-scale-down h-full w-full" src={`http://localhost:3001${user.profilepic}`} width="40" height="40" />}
										</div>
 );
}
 
export default ImageCard;