import './App.css';
import { Route,Routes,Link } from 'react-router-dom';
import Home from './Components/home/Home'
import Signup from './Components/Signup';
import Login from './Components/Login';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>Hi Hello</h1> */}
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Art Gallery
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="signup">
                    SignUp
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/*} <Route path="/contactus" element={<Contactus />} />
        <Route path="/userdashboard" element={<Userdashboard />}>
          <Route path="profile" element={<Userprofile />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<Products />} />
           Navigating to profile when child path is empty 
          <Route path="" element={<Navigate to="profile" replace={true} />} />  
        </Route>  */}
        </Routes>
      </header>
    </div>
  );
}

export default App;