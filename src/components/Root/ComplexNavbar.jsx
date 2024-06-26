import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { useNavigate, NavLink } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Badge,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  // const closeMenu = () => setIsMenuOpen(false);

  const handleProfileButton = (key) => {
    const { route, label, iscomponent } = profileMenuItems[key];
    if (route) {
      if (iscomponent) {
        navigate(route, { state: { openComponent: label } });
      } else {
        navigate(route);
      }
    }
  };

  // profile menu component
  const profileMenuItems = [
    {
      label: "Manage Account",
      icon: UserCircleIcon,
      route: "/me",
    },
    // {
    //   label: "Edit Profile",
    //   icon: Cog6ToothIcon,
    // },
    {
      label: "Inbox",
      icon: InboxArrowDownIcon,
      route: "/me",
      iscomponent: true,
    },
    // {
    //   label: "Help",
    //   icon: LifebuoyIcon,
    //   route: "/help",
    // },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];

  const handleSignOut = () => {
    // Lösche den JWT-HTTPOnly-Cookie
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // console.log("logout")
    // Lösche den LocalStorage-Eintrag
    localStorage.removeItem("user");

    // Optional: Weitere Aufräumarbeiten (z.B. Zurücksetzen des Benutzerkontexts)
    setUser(null);

    // Optional: Weiterleitung auf die Sign-Out-Seite oder eine andere gewünschte Seite
    navigate("/");
  };
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Badge overlap="circular" placement="bottom-end" withBorder>
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src={
                user?.image ||
                "https://i0.wp.com/dashboard.render.com/default_gravatar.png?ssl=1"
              }
            />
          </Badge>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, route }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                if (label === "Sign Out") {
                  handleSignOut();
                } else {
                  handleProfileButton(key);
                }
              }}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export function ComplexNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar className="p-2 max-w-[124rem] rounded-none shadow-none">
      <div className="flex items-center justify-between text-blue-gray-900 px-16">
        <Typography
          as="a"
          href="/"
          variant="h4"
          className="mr-4 ml-2 cursor-pointer py-1.5 text-black"
        >
          GameXTrade
        </Typography>

        {/* if user exist display ProfileMenu else Login & Signup */}
        {user ? (
          <ProfileMenu />
        ) : (
          <div>
            <NavLink to={`/sign-in`}>
              <Button size="sm" variant="text">
                Log In
              </Button>
            </NavLink>
            <NavLink to={`/sign-up`}>
              <Button size="sm" variant="text">
                Sign Up
              </Button>
            </NavLink>
          </div>
        )}
      </div>
    </Navbar>
  );
}
