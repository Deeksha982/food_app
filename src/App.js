import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/Login/Login';
import SignupForm from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import SubmitPage from './pages/SubmitPage/SubmitPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<SignupForm />}/>
        <Route path={'/login'} element={<LoginForm />}/>
        <Route path={'/dashboard'} element={<Dashboard />}/>
        <Route path={'/submit'} element={<SubmitPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
