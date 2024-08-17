import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './login'
import Registro from './registro'
import $ from 'jquery'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider>
      <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
        </Routes>
      </Router>
    </CookiesProvider>
  </React.StrictMode>,
)