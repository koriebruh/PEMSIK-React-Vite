import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import RouteList from "./RouteList.jsx";



createRoot(document.getElementById('root')).render(
    <StrictMode>
            <RouteList/>
    </StrictMode>
);