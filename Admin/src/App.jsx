import {BrowserRouter, Route, Routes} from 'react-router-dom'
import CreateDepartment from './components/dapartment/createDepart.jsx'
import UpdateDepartment from './components/dapartment/updateDepart.jsx'
import CreateCategory from './components/category/createCate.jsx'
import UpdateCategory from './components/category/updateCate.jsx'
import CreateStatus from './components/status/createStatus.jsx'
import UpdateStatus from './components/status/updateStatus.jsx'
import CreateUser from './components/user/createUser.jsx'
import UpdateUser from './components/user/updateUser.jsx'
import CreatePosi from './components/position/createPosition.jsx';
import UpdatePosi from './components/position/updatePosition.jsx';
import CreateItem from './components/Item/createItem.jsx';
import UpdateItem from './components/Item/updateItem.jsx'
import Login from './pages/Login.jsx';
import Home from './pages/home.jsx';
import Notification from './pages/Notification.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/department' element={<CreateDepartment/>}/>
        <Route path='/department/update/:id' element={<UpdateDepartment/>}/>
        <Route path='/category' element={<CreateCategory/>}/>
        <Route path='/category/update/:id' element={<UpdateCategory/>}/>
        <Route path='/status' element={<CreateStatus/>}/>
        <Route path='/status/update/:id' element={<UpdateStatus/>}/>
        <Route path='/user' element={<CreateUser/>}/>
        <Route path='/user/update/:id' element={<UpdateUser/>}/>
        <Route path='/position' element={<CreatePosi/>}/>
        <Route path='/position/update/:id' element={<UpdatePosi/>}/>
        <Route path='/item' element={<CreateItem/>}/>
        <Route path='/item/update/:id' element={<UpdateItem/>}/>
        <Route path='/notification' element={<Notification/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App