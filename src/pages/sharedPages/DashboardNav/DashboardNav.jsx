import { Link } from 'react-router-dom';

const DashboardNav = () => {
  const link = (
    <>
      <li>
        <Link to="/dashboard/studentHome">Student Home</Link>
      </li>
      <li>
        <Link to="/dashboard/Select-Classes">My Selected Class</Link>
      </li>
      <li>
        <Link to="/dashboard/enrolled-class">My Enrolled Class</Link>
      </li>
      <li>
        <Link to="/dashboard/payment-history">Payment History</Link>
      </li>
    </>
  );
  return (
    <div className="navbar z-10 bg-base-100 shadow-md sticky top-0 px-5 lg:px-12">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {link}
          </ul>
        </div>
        <div className="navbar-start text-xl uppercase font-bold">
          <Link to="/">Langauge Loom</Link>
        </div>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{link}</ul>
      </div>
    </div>
  );
};

export default DashboardNav;
