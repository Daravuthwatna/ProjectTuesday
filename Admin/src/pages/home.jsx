import Navbar from '../components/utils/navbar.jsx'
import Sidebar from '../components/utils/sidebar.jsx'

const App = () => {
  return (
    <div className='container-fluid vh-100 vw-100'>
      <div className="row">
        <div className='container-fluid p-3'>
          <div className="row">
            <Navbar/>
          </div>
        </div>
        <div className='container'>
          <div className="row">
            <div className='col-lg-2'>
              <Sidebar/>
            </div>
            <div className='col-lg-10'>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App