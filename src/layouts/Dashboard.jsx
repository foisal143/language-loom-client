import { Outlet } from 'react-router-dom';
import Footer from '../pages/sharedPages/Footer/Footer';
import DashboardNav from '../pages/sharedPages/DashboardNav/DashboardNav';

const Dashboard = () => {
  return (
    <div>
      <DashboardNav />
      <div className="min-h-[calc(100vh-80px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
