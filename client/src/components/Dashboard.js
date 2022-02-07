import { useAuth } from "../contexts/userContext";
import TeacherDashboard from "./teacher/TeacherDashboard";
import StudentDashboard from "./student/StudentDashboard";


function Dashboard(){

    const { user } = useAuth();

    return user.info?.userInfo?.role === "student"?
    <StudentDashboard />:<TeacherDashboard />;
}

export default Dashboard;