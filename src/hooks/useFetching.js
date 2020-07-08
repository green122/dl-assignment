import {useEffect, useReducer} from "react";
import {AxiosError} from 'axios';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'request':
      return {...state, isLoading: true, error: undefined};
    case 'success':
      return {...state, isLoading: false, data: action.payload, error: undefined};
    case 'failure':
      return {...state, isLoading: false, error: action.payload};
  }
};

export function useFetching(action, initialValue, deps) {

  const initialState = {data: initialValue, isLoading: false};
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      const requestPromise = action();
      if (!requestPromise) {
        return;
      }
      dispatch({type: 'request'});

      try {
        const result = await requestPromise;
        if (!didCancel) {
          dispatch({type: 'success', payload: result});
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({type: 'failure', payload: error});
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, deps);

  return state;
}
