'use client'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const ClientSideToastContainer = () => <ToastContainer
    position='top-right'
    autoClose={3000}
    hideProgressBar={true}
    closeOnClick
    pauseOnHover
    theme='dark'
    limit={1}
/>

export default ClientSideToastContainer