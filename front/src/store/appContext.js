import { createContext, useState } from "react";
import getState from "./flux";

export const Context = createContext(null);

const injectContext = PassedComponent => {
    const StoreWrapper = props => {

        const [state, setstate] = useState(getState(
            {
                getStore : () => state.store,
                getActions : () => state.actions,
                setStore : updatedStore => setstate({
                    store: Object.assign(state.store, updatedStore),
                    actions: { ...state.actions }
            })
        }));

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    }
}

export default injectContext;