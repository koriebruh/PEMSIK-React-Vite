import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import RouteList from "./RouteList.jsx";
import {Provider} from "react-redux";
import {store} from "./store/store.jsx";



createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouteList/>
        </Provider>
    </StrictMode>
);