import { useCallback, useState } from "react";
import {  useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";
import { cartActions } from "../store/cart-slice";
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const sendRequest = useCallback(async (requestConfig,applyData) => {
  
    dispatch(
      uiActions.hiddenNotification()
    );
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, 
      {
        method: requestConfig.method ? requestConfig.method: 'GET',
        headers: requestConfig.headers?  requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body):null,
      });


      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);

    } catch (err) {
      setError(err.message || "Something went wrong!");
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: err.message
        })
      );
    }
    finally{
      setIsLoading(false);
    }
  },[dispatch]);
  return { isLoading, error, sendRequest };
};

export default useHttp;
