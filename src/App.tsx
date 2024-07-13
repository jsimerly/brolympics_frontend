import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import { AuthProvider } from './context/auth';
import './firebase/firebaseConfig'

function App() {

  return (
    <>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </AuthProvider>
    </>
  )
}

export default App
