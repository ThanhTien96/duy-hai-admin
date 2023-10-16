import { App } from 'antd';
import React from 'react'
import { Provider } from 'react-redux'
import store from 'store'
type StoreProviderProps = {
    children?: React.ReactNode;
}

const StoreProvider= ({children}: StoreProviderProps) => {
  return (
    <Provider store={store}>
        <App>{children}</App>
    </Provider>
  )
}

export default StoreProvider