
import useAuth from './UseAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRouter = ({children}) => {
    const location =useLocation()
    const {user, loading}=useAuth();
    if(loading){
        return <span className="loading loading-spinner text-success"></span>
    }
    if(user  && user?.email){
         return children ;
        
    }
     return <Navigate  state={location.pathname} to={"/login"}></Navigate>
    
};

export default PrivateRouter;