import React, { useEffect, useState } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ForumIcon from "@mui/icons-material/Forum";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ListIcon from "@mui/icons-material/List";
import { useStateValue } from "../../store/StateProvider";
import Sidebar from "../../pages/home/Sidebar";
import {
  Link,
  useLocation,
  useNavigate,
} from "../../../node_modules/react-router-dom/index";
import { signOut } from "firebase/auth";
import { auth } from "../../pages/home/firebase";
import SearchBar from "../SearchBar/SearchBar";
import facebookLogo from "../../assets/images/logo-facebook-chu.png";

function Header() {
  const [{ user }] = useStateValue();

  const [showSidebar, setShowSidebar] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const reportWindowSize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", reportWindowSize);
    return () => {
      window.removeEventListener("resize", reportWindowSize);
    };
  }, []);

  useEffect(() => {
    const handleCloseSearchBarWindow = () => {
      setShowSearchBar(false);
    };

    window.addEventListener("click", handleCloseSearchBarWindow);

    return () => {
      window.removeEventListener("click", handleCloseSearchBarWindow);
    }
  }, [])

  const handleClick = () => {
    setShowSidebar(!showSidebar);
  };

  const handleShowSearchBar = () => {
    setShowSearchBar(true);
  };

  const handleCloseSearchBar = () => {
    setShowSearchBar(false);
  };

  const handleLogOut = () => {
    if (auth.currentUser) {
      signOut(auth)
        .then(() => {
          localStorage.setItem("isSignIn", "signOut");
          localStorage.setItem("user", null);
          window.location.reload();
        })
        .catch(() => {
          alert("Sign out failed");
        });
    } else {
      localStorage.setItem("isSignIn", "signOut");
      localStorage.setItem("user", null);
      window.location.reload();
    }
  };

  const handleGetValueFromSearchBar = (value) => {
    setSearchValue(value);
  };

  const handleGoToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <div className="header">
      {showSidebar && (
        <Sidebar closeSideBarHeader={setShowSidebar} isHeaderClick={true} />
      )}
      <div
        className="header__left"
        onClick={(e) => {
          e.stopPropagation();
          setShowSidebar(false);
        }}
      >
        <Link to="/" onClick={handleGoToTop}>
          {windowWidth < 490 ? (
            <img src={facebookLogo} alt="" />
          ) : (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
              alt=""
            />
          )}
        </Link>
        {showSearchBar && (
          <SearchBar
            handleGetValue={handleGetValueFromSearchBar}
            closeSearchBar={handleCloseSearchBar}
            valueSearchInit={searchValue}
          />
        )}
        {windowWidth > 490 && (
          <div className="header__input" onClick={handleShowSearchBar}>
            <SearchIcon />
            <p className={searchValue ? "black" : {}}>
              {searchValue || "Search Facebook"}
            </p>
          </div>
        )}
      </div>

      <div
        className="header__center"
        onClick={(e) => {
          setShowSidebar(false);
        }}
      >
        <Link to="/">
          <div
            className={
              pathname === "/"
                ? `header__option 
                header__option--active`
                : `header__option`
            }
          >
            <HomeIcon />
            <p>Home</p>
          </div>
        </Link>
        <Link to="friends">
          <div
            className={
              pathname === "/friends"
                ? `header__option 
                header__option--active`
                : `header__option`
            }
          >
            <PeopleOutlineIcon />
            <p>Friends</p>
          </div>
        </Link>
        <Link to="watch">
          <div
            className={
              pathname === "/watch"
                ? `header__option 
                header__option--active`
                : `header__option`
            }
          >
            <SubscriptionsIcon />
            <p>Watch</p>
          </div>
        </Link>
        <Link to="groups">
          <div
            className={
              pathname === "/groups"
                ? `header__option 
                header__option--active`
                : `header__option`
            }
          >
            <GroupsIcon />
            <p>Groups</p>
          </div>
        </Link>
        <Link to="gaming">
          <div
            className={
              pathname === "/gaming"
                ? `header__option 
                header__option--active`
                : `header__option`
            }
          >
            <SportsEsportsIcon />
            <p>Gaming</p>
          </div>
        </Link>
      </div>

      <div
        className="header__right"
        onClick={(e) => {
          if (windowWidth <= 490) {
            e.stopPropagation();
          } else {
            return;
          }
        }}
      >
        {windowWidth <= 490 && (
          <div className="header__input" onClick={handleShowSearchBar}>
            <SearchIcon />
            <p className={searchValue ? "black" : {}}>
              {searchValue || "Search Facebook"}
            </p>
          </div>
        )}

        <div
          className="header__info"
          onClick={() => {
            navigate(`/profile/me`, {
              state: { name: user.displayName, avatar: user.photoURL },
            });
          }}
        >
          <Avatar src={user.photoURL} />
          <h4>{user.displayName}</h4>
        </div>
        <IconButton onClick={handleClick}>
          <ListIcon className="header__list" />
        </IconButton>
        <IconButton className="header__icon">
          <AddIcon />
        </IconButton>
        <IconButton className="header__icon">
          <ForumIcon />
        </IconButton>
        <IconButton className="header__icon">
          <NotificationsActiveIcon />
        </IconButton>
        <IconButton className="header__icon" onClick={handleLogOut}>
          <LogoutIcon />
          <p>Log Out</p>
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
