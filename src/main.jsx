import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import AdminLayout from './pages/AdminLayout.jsx'
import './index.css'
import RouteList from "./RouteList.jsx";

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AdminLayout />
//   </StrictMode>,
// )

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouteList/>
    </StrictMode>
);