import React, {useState} from 'react'
import Context from './SharedContext';
import { Drawer } from 'components/shared';


export interface ISharedProviderProps {
    children?: React.ReactNode;
}

function SharedProvider(props: ISharedProviderProps) {

    const states = useState<any>({
        drawer: {},
    })

    const [state, setState] = states;
  return (
    <Context.Provider value={[state, setState]}>
        {props.children}
        <Drawer {...state.drawer} />
    </Context.Provider>
  )
}

export default SharedProvider