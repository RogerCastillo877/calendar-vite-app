import { useDispatch, useSelector } from "react-redux";
import { calendarAPi } from "../api";

export const useAuthStore = () => {

  const { status, user, errorMessage } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  const startLogin = async({ email, password }) => {
    console.log( email, password );

    try {
    
      const resp = await calendarAPi.post('/auth', { email, password })
      console.log({ resp });
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    // Properties
    status,
    user,
    errorMessage,
    
    // Methods
    startLogin,
  }
};