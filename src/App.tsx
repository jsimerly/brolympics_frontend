import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import { AuthProvider } from './context/auth';
import './firebase/firebaseConfig'
import SignUp from './components/auth/SignUp';
import AnonymousOnlyRoute from './routes/AnonymousOnlyRoute';
import Home from './components/home/Home';
import Navbar from './components/nav/Navbar';

function App() {

  return (
    <>
    <Router>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
            <Route 
              path='/login' 
              element={
                <AnonymousOnlyRoute>
                  <Login/>
                </AnonymousOnlyRoute>
              }
            />
            <Route 
              path='/create-account' 
              element={
                <AnonymousOnlyRoute>
                  <SignUp/>
                </AnonymousOnlyRoute>
              }
            />
        </Routes>
      </AuthProvider>
    </Router>

    </>
  )
}

export default App
