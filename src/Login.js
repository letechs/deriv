import React, { useRef } from 'react'
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authorize } from './features/api/apiSlice';
export const Login = () => {

    const dispatch = useDispatch();
     const {user,isError, isLoading, isSuccess, message} = useSelector((state) => state.api);
    const token = "B07CZVHI55r19ES"
    const inToken = useRef(null);
    const hello = (e) => {

        dispatch(authorize(inToken.current.value))
    }
    useEffect(() => {
        if (isError) {
         console.log("error throh", message)
        }
    
        if (isSuccess && user) {
          console.log("user information", user)
        }
    
      }, [user, isError, isSuccess, message, dispatch]);
    
    
    return (
        <div>
            <input  ref={inToken}/>
            <button onClick={hello}> Login</button>
        </div>
    )
}

export default Login;
