
import Cookies from "js-cookie"
import {Redirect,Route} from "react-router-dom"

const ProtectedRoute = (props) => {
    const jwt = Cookies.get("jwt_token")
    if (jwt !== undefined){
      return <Route {...props}/>
    }
    else{
        return <Redirect to="/login"/>
    }
}

export default ProtectedRoute