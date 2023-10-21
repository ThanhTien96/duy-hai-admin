/**
 * The provider to call api on the top 
 */

import React, {useEffect} from "react";
import { useAppDispatch } from "store";
import { thunkFetchSubCategories } from "store/common/menu/menuAsyncThunk";

type DataProviderProps = {
  children: React.ReactNode;
};

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    dispatch(thunkFetchSubCategories(controller.signal));

    return () => {
      controller.abort();
    };
  }, []);

  return <>{children}</>;
};

export default DataProvider;
