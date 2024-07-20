import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import CreateRequest from './components/request/createRequest.jsx'
import UpdateRequest from './components/request/updateRequest.jsx'
import DashboardItem from './components/Item/dashboardItem.jsx'
import DashboardUser from './components/user/dashboardUser.jsx'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/request' element={<CreateRequest/>}/>
        <Route path='/request/update/:id' element={<UpdateRequest/>}/>
        <Route path='/item' element={<DashboardItem/>}/>
        <Route path='/user' element={<DashboardUser/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App