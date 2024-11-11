import React, { useContext, useRef } from "react";
import Logo from "../../assets/images/logo.png";
import { Link, NavLink } from "react-router-dom";
import profile from "../../assets/images/profile.png";
import { BiMenu } from "react-icons/bi";
import { AuthContext } from "../../context/authContext";
import AvatarCom from "../AvatarCom";
import { useUser } from "@clerk/clerk-react";

const navLinks = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/gasses",
    display: "Gasses",
  },
  {
    path: "/service",
    display: "Booking",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  // const { user, role, token } = useContext(AuthContext);
  const { user } = useUser();

  const toggleMenu = () => menuRef.current.classList.toggle("showMenu");

  return (
    <header ref={headerRef} className="header stickyHeader flex items-center">
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            {/* <img src={Logo} alt="Logo" /> */}
            GassConnect
          </div>

          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-Color leading-7 font-[500] text-[16px]"
                        : "text-TextColor leading-7 font-[500] text-[16px]"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {user ? (
            <AvatarCom />
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/sign-in"
                className="bg-Color py-2 px-6 text-white font-[500] h-[44px] flex text-center justify-self-center rounded-[50px]"
              >
                <span className=" -mt-6">Login</span>
              </Link>
              <Link
                to="/sign-up"
                className="bg-Color py-2 px-6 text-white font-[500] h-[44px] flex text-center justify-self-center rounded-[50px]"
              >
                <span className=" -mt-6">Signup</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
