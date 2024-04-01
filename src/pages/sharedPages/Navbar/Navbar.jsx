import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Authprovaider/Authprovaider';
import './Navbar.css';
import useAdmin from '../../../hooks/useAdmin';
import useInstructor from '../../../hooks/useInstructor';
import { ThemeContext } from '../../../ThemeProvaider/ThemeProvaider';

const Navbar = () => {
  const isAdmin = useAdmin();
  const isInstructor = useInstructor();
  const { logout, user } = useContext(AuthContext);
  const { isDark, setIsdark } = useContext(ThemeContext);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/instractors">Instractors</NavLink>
      </li>
      <li>
        <NavLink to="/classes">Classes</NavLink>
      </li>
      {user ? (
        <Link
          to={
            (user && isAdmin && '/dashboard/adminHome') ||
            (user && isInstructor && '/dashboard/instructorHome') ||
            '/dashboard/studentHome'
          }
        >
          <li className="cursor-pointer hover:text-blue-500">Dashboard</li>
        </Link>
      ) : (
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
    </>
  );

  const handlerLogout = () => {
    logout().then().catch();
  };

  // handler theme change
  const handlerThemeChange = e => {
    const themeValue = e.target.checked;
    localStorage.setItem('theme', themeValue);
    setIsdark(themeValue);
  };
  console.log(isDark);
  return (
    <div
      className={`navbar  shadow-md sticky top-0  w-full z-10 lg:px-12 ${
        isDark ? 'bg-black text-white' : 'bg-white'
      }`}
    >
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
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 ${
              isDark ? 'bg-black' : 'bg-white'
            }`}
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="text-2xl font-bold">
          Language Loom
        </Link>
      </div>

      <div
        className={` hidden lg:flex ${user ? 'navbar-center' : 'navbar-end'}`}
      >
        <ul className=" navLink flex gap-10 px-1">{links}</ul>
      </div>
      {user && (
        <div className="navbar-end">
          <input
            onChange={handlerThemeChange}
            type="checkbox"
            className="toggle me-5"
            defaultChecked={isDark}
          />

          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 ${
                isDark ? 'bg-black' : 'bg-white'
              }`}
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={handlerLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
