import {
  BrowserRouter, Route, Routes
} from 'react-router-dom'
import PasswordForget from './components/forgetpassword';
import Login from './components/login';

import Register from './components/register';
import ResetForm from './components/resetpassword';
import PostsCheck from './components/free_lancer/projects';
import SuccessCard from './components/success';
import ActivationCard from './components/activation'
import { createTheme, ThemeProvider } from '@mui/material'
import ClientHompageCheck from './components/client/hompage';

const theme_obj = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#4a148c',
    },
  }
})

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme_obj}>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/forgetpassword" element={<PasswordForget />}></Route>
          <Route path="/resetpassword/:id" element={<ResetForm />}></Route>
          <Route path="/success" element={<SuccessCard />}></Route>
          <Route path="/activated" element={<ActivationCard />}></Route>
          <Route path='/home' element={<ClientHompageCheck/>}></Route>
          {/* <Route path="/create/post" element={<PostCreation />}></Route> */}
          <Route path="/posts" element={<PostsCheck />}></Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
