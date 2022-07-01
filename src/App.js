import './App.css';
import { Route,Routes,Link } from 'react-router-dom';
import Home from './Components/home/Home'
import Signup from './Components/Signup';
import Login from './Components/Login';
import MyCart from './Components/MyCart';
import CheckOut from './Components/check-out/checkOut';
import MyArts from './Components/my-arts/MyArts';
import { useNavigate } from 'react-router-dom' ;
import { useState } from 'react';
import { useEffect } from 'react';


function App() {

    const [islogged,setState]=useState(false)

  useEffect(()=>{
    console.log("FIRST EXECUTED   ");
    const name=localStorage.getItem("username");
      if(name!=null)
      {
        setState(true);
      }
   })

  const navigate = useNavigate();
  const userLogout = () => {
    console.log("!!!!!!!!!!!!!!!!!!")
    localStorage.clear();
    //dispath(clearLoginStatus());
    navigate("/");
    setState(false);
  };
  
  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>Hi Hello</h1> */}
        <nav className="navbar navbar-expand-lg " style={{backgroundColor:'#E4E4E0'}} >
          <div className="container-fluid">
            <a className="navbar-brand" href="/" style={{color: "red",fontSize:40,fontWeight:600}}>
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
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0" >
                <li className="nav-item" >
                  <Link className="nav-link active" aria-current="page" to="/" style={{color: "red",fontSize:20,fontWeight:500,padding:10}}>
                    Home
                  </Link>
                </li>
                { islogged==true&&
                <li className="nav-item">
                  <Link className="nav-link" to="my-arts" style={{color: "red",fontSize:20,fontWeight:500,padding:10}}>
                    My Arts
                  </Link>
                </li>}
                { islogged==true&&
                <li className="nav-item">
                  <Link className="nav-link" to="my-cart" style={{color: "red",fontSize:20,fontWeight:500,padding:10}}>
                    My Cart
                  </Link>
                </li>
                }
                 { islogged==false &&
                <li className="nav-item">
                  <Link className="nav-link" to="signup" style={{color: "red",fontSize:20,fontWeight:500,padding:10}}>
                    SignUp
                  </Link>
                </li>
                }
                 { islogged==false &&
                <li className="nav-item">
                  <Link className="nav-link" to="login" style={{color: "red",fontSize:20,fontWeight:500,padding:10}}>
                    Login
                  </Link>
                </li>
                }
                 { islogged==true &&
                <li className="nav-item">
                  <Link className="nav-link" to="#" style={{color: "red",fontSize:20,fontWeight:500,padding:10}} onClick={userLogout}>
                    Logout
                  </Link>
                </li>  
                }              
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-cart" element={<MyCart/>} />
          <Route path="/check-out" element={<CheckOut />} />
          <Route path="/my-arts" element={<MyArts />} />
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