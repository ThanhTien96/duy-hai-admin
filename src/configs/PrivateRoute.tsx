import { NoAuthorizedPage } from 'pages';
import React from 'react'
import { useNavigate } from 'react-router';
import { StoreState, useAppDispatch, useAppSelector } from 'store'

type PrivateRouteProps = {
    renderIfTrue: (state: StoreState) => boolean;
    children: React.ReactElement;
    fallbackComponent: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({renderIfTrue, children, fallbackComponent = <NoAuthorizedPage />}) => {
  const store = useAppSelector(store => store);

  // const handleFetchProfile = async () => {
  //   try {
  //     if(localStorage.getItem("access_token")) {
  //       await dispatch(thunkFetchProfile());
  //       navigate(-1)
  //     }
  //   } catch (err: Error | any) {
  //     dispatch(setAlert({message: err.response.data.message ?? "Lấy thông tin tài khoản thất bại!", status: STORE_STATUS.error}));
  //   }
  // }

  // useEffect(() => {
  //   if(localStorage.getItem("access_token")) {
  //     handleFetchProfile();
  //   }
  // },[])

  if(renderIfTrue && renderIfTrue(store) || !renderIfTrue) {
    return children
  }
  return fallbackComponent;
}

export default PrivateRoute