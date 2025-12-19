import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/Login.jsx';
import { Home } from './pages/Home/Home.jsx';
import { NewService } from './pages/New-service/New-service.jsx';
import { Services } from './pages/Services/Services.jsx';
import { ServiceDatails } from './pages/Service-details/ServiceDetails.jsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/home" replace />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/home' element={<Home />} />
      <Route path='/newService' element={<NewService />} />
      <Route path='/services' element={<Services />} />
      <Route path='/services/:id' element={<ServiceDatails />} />
    </Routes>
  )
}

export default App
