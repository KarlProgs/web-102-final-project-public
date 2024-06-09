import { Outlet, Link } from "react-router-dom";

import '/src/App.css'

const Layout = () => {
  return (
    <div>
      <h1>Helldivers Forum</h1>
      <nav>
        <ul>
          <Link to="/">
            <li className="nav-link-button" key="home-button">
              Home
            </li>
          </Link>
          <Link to="/create">
            <li className="nav-link-button" key="create-button">
              Create
            </li>
          </Link>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
