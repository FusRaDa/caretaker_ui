import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import TimeStamps from "./timestamp/TimeStamps";
import { ProviderComposer, provider } from "./utils/Compose";
import ErrorPage from "./utils/ErrorPage";
import Login from "./utils/Login";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Router>
        <ProviderComposer providers={[
          provider(AuthProvider),
        ]}>

          <Routes>


            <Route element={<PrivateRoute/>}>
              <Route exact path='/' element={<TimeStamps/>}/>
            </Route>


            <Route element={<Login/>} path='/login' exact />
            <Route element={<ErrorPage/>} path='/error_page' exact />

          
          </Routes>
        </ProviderComposer>
      </Router>
    </div>
  )
}

export default App;
