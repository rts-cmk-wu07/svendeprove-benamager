import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate()

  return (
    <>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          {token ? <button onClick={handleLogout}>Log out</button> : <NavLink to="/login">Log in</NavLink>}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
