import { NavLink } from "react-router-dom";

function Menu({loginStatus, clickHandler, userName}) {
  //console.log(userName)
  return (
    <nav className="menu">
      <div className="greeting">{userName ? `Добро пожаловать, ${userName}!` : undefined}</div>
      <NavLink to="/login" className="menu__item">
        <button className="btn login-btn" onClick={() => clickHandler(loginStatus)}>{loginStatus ? 'Выйти' : 'Войти'}</button>
      </NavLink>
    </nav>
  );
}

export default Menu