import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import LoginPageJobProvider from "../Pages/LoginPageJobProvider";
import SignupJobSeeker from "../Components/SignupJobSeeker";
import Logout from "../Components/LogoutComponent";
import JobSeekerDashboardPage from "../Pages/JobSeekerDashBoardPage";
import JobProviderDashBoardPage from "../Pages/JobProviderDashBoardPage";
import JobSeekerAllJobs from "../Pages/JobSeekerAllJobs";
import JobSeekerAppliedJobs from "../Pages/JobSeekerAppliedJobs";
import JobSeekerFindJobs from "../Pages/JobSeekerFindJobs";
import JobSeekerProfileDetails from "../Pages/JobSeekerProfileDetails";
import ResumeUpload from "../Components/DashBoardComponentsJobSeeker/UploadCV";
import UploadCVPage from "../Pages/JonSeekerUploadCV";
import ChatPageJobSeeker from "../Pages/JobSeekerChat";
import JobProviderPostedJobs from "../Pages/JobProviderPostedJobsPage";
import JobProviderCreateJob from "../Pages/JobProviderCreateJobPage";
import JobProviderProfileDetails from "../Pages/JobProviderProfileDetails";
import SignUpJobProviderComponent from "../Components/SignupJobProvider";
import SignupJobProvider from "../Pages/SignupPageJobProvider";
import JobProviderEditJobs from "../Pages/JobProviderEditJob";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/home", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/login/jobProvider", element: <LoginPageJobProvider /> },
  { path: "/login/jobSeeker", element: <LoginPage /> },
  { path: "/signup/jobSeeker", element: <SignupJobSeeker /> },
  { path:"/logout" ,element:<Logout/> } ,
  { path:"/dashboard/jobseeker" ,element:<JobSeekerDashboardPage/> }, 
  { path:"/alljobs/jobseeker" ,element:<JobSeekerAllJobs/> }, 
  { path:"/appliedjobs/jobseeker" ,element:<JobSeekerAppliedJobs/> }, 
  { path:"/findjobs/jobseeker" ,element:<JobSeekerFindJobs/> },
  { path:"/profiledetails/jobseeker" ,element:<JobSeekerProfileDetails/> },

  {path:"/resumeupload/jobseeker",element:<UploadCVPage/>},
  {path:"/chat/jobseeker",element:<ChatPageJobSeeker/>},
  
  { path:"/dashboard/jobprovider" ,element:<JobProviderDashBoardPage/> } ,
  { path:"/postedjobs/jobprovider" ,element:<JobProviderPostedJobs/> } ,
  { path:"/createjob/jobprovider" ,element:<JobProviderCreateJob/> } ,
  { path:"/profiledetails/jobprovider" ,element:<JobProviderProfileDetails/> } ,
  { path:"/editjobs/jobprovider/:jobId" ,element:<JobProviderEditJobs/> } ,
  { path: "/signup/jobProvider", element: <SignupJobProvider /> },
  


]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
