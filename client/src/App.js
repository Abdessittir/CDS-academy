import { Fragment, useEffect } from "react";
import "./App.css";
import Home from "./components/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./components/user/Login";
import { useAlert } from "./contexts/alertContext";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Register from "./components/user/Register";
import { useAuth } from "./contexts/userContext";
import { getUserDetails } from "./services/userService";
import ClassDetail from "./components/student/ClassDetail";
import UserRoute from "./components/UserRoute";
import StudentDashboard from "./components/student/StudentDashboard";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import CreateClass from "./components/teacher/CreateClass";


function App() {
  const {alert , setAlert} = useAlert();
  const { user, setUser } = useAuth();
  
  useEffect(() =>{
    async function fetchData(){
      setUser(prev =>({
        ...prev,
        loading:true
      }));
      const response = await getUserDetails();

      if(response.success){
        setUser({
          isLoggedIn:true,
          loading:false,
          info:response.userData,
          error:null,
        });
      }
      else{
        setUser(prev =>({
          ...prev,
          loading:false,
          isLoggedIn:false,
          error:response
        }));

        localStorage.removeItem("user");
      }
    }

    if(user.isLoggedIn){
      fetchData();
    }
  }, []);

  useEffect(() =>{
    if(user.error){
      setAlert({
        from:"",
        type:"error",
        message:user.error
      });
    }
  }, [user]);

  function handleClose(){
    setUser(prev => ({...prev, error:null}));
    setAlert({type:"", message:"",from:""})
  }

  return (
    <Fragment>
      <div className="app">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<UserRoute />}>
              <Route path="/student_dashboard" element={<StudentDashboard />} />
              <Route path="/teacher_dashboard" element={<TeacherDashboard />} />
              <Route path="/student/class/:id" element={<ClassDetail />} />
              <Route path="/class/create" element={<CreateClass />} />
            </Route>

          </Routes>
        </Router>

        {alert.type && (
          <Alert
            onClose={handleClose}
            className="alert"
            severity={alert.type}
          >
            <AlertTitle>{alert.type}</AlertTitle>
            {alert.message}
          </Alert>
        )}
      </div>
    </Fragment>
  );
}

export default App;
