import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import AdminDashboard from './pages/admin/AdminDashboard';
import Certificates from './pages/admin/Certificates';
import Users from './pages/admin/Users';
import StudentDashboard from './pages/student/StudentDashboard';
import MyLearning from './pages/student/MyLearning';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import PlaceholderPage from './components/PlaceholderPage';
import GenericAdminPage from './pages/admin/GenericAdminPage';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';
import { useAuth } from './store/authStore';
import { AdminProvider } from './store/AdminContext';
import { 
  programsData, 
  batchesData, 
  enrollmentsData, 
  mentorsData, 
  curriculumData, 
  assessmentsData, 
  paymentsData, 
  notificationsData 
} from './data/mockAdminData';

function App() {
  const { user } = useAuth();

  return (
    <AdminProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          {/* Base redirect based on role */}
          <Route index element={
            user ? (
              user.role === 'admin' ? <Navigate to="/admin" replace /> :
              user.role === 'student' ? <Navigate to="/student" replace /> :
              <Navigate to="/faculty" replace />
            ) : <Navigate to="/login" replace />
          } />
          
          {/* Admin Routes */}
          <Route path="admin">
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="programs" element={<GenericAdminPage categoryKey="programs" {...programsData} />} />
            <Route path="batches" element={<GenericAdminPage categoryKey="batches" {...batchesData} />} />
            <Route path="enrollments" element={<GenericAdminPage categoryKey="enrollments" {...enrollmentsData} />} />
            <Route path="mentors" element={<GenericAdminPage categoryKey="mentors" {...mentorsData} />} />
            <Route path="curriculum" element={<GenericAdminPage categoryKey="curriculum" {...curriculumData} />} />
            <Route path="assessments" element={<GenericAdminPage categoryKey="assessments" {...assessmentsData} />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="payments" element={<GenericAdminPage categoryKey="payments" {...paymentsData} />} />
            <Route path="notifications" element={<GenericAdminPage categoryKey="notifications" {...notificationsData} />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
          
          {/* Student Routes */}
          <Route path="student">
            <Route index element={<StudentDashboard />} />
            <Route path="learning" element={<MyLearning />} />
            <Route path="practice" element={<PlaceholderPage title="Practice Hub" description="Interactive coding labs and exercises." />} />
            <Route path="progress" element={<PlaceholderPage title="My Progress" description="Detailed analytics on your learning journey." />} />
            <Route path="community" element={<PlaceholderPage title="Community" description="Connect with peers and mentors." />} />
            <Route path="*" element={<Navigate to="/student" replace />} />
          </Route>
          
          {/* Faculty Routes */}
          <Route path="faculty">
            <Route index element={<FacultyDashboard />} />
            <Route path="batches" element={<PlaceholderPage title="My Batches" description="Overview of your assigned cohorts." />} />
            <Route path="grading" element={<PlaceholderPage title="Grading" description="Review and grade student submissions." />} />
            <Route path="schedule" element={<PlaceholderPage title="Schedule" description="Manage your live sessions and Q&A slots." />} />
            <Route path="students" element={<PlaceholderPage title="My Students" description="Track progress of individual learners." />} />
            <Route path="resources" element={<PlaceholderPage title="Resources" description="Access teaching materials and guides." />} />
            <Route path="*" element={<Navigate to="/faculty" replace />} />
          </Route>
        </Route>
      </Routes>
    </AdminProvider>
  );
}

export default App;
