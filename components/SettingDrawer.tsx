import { useStorage } from "@plasmohq/storage/hook";
import { useEffect, useState } from "react";
import BackIcon from "./BackIcon";
import SettingLabel from "./SettingLabel";
import { Paintbrush, Download, User, MessageSquare, Trash2, LogOut } from "lucide-react";

const SettingDrawer = ({ close, setClose }) => {
  // Storage hooks
  const [themeMode, setThemeMode] = useStorage<string>("themeMode", "light");
  const [savedGuides, setSavedGuides] = useStorage<any[]>("savedGuides", []);
  const [accountSettings, setAccountSettings] = useStorage<any>("accountSettings", {});
  const [clearDataConfirm, setClearDataConfirm] = useStorage<boolean>("clearDataConfirm", false);
  const [isLoggedIn, setIsLoggedIn] = useStorage<boolean>("isLoggedIn", false);

  // Add useEffect to handle theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === "dark") {
      root.setAttribute("data-theme", "dark");
    } else if (themeMode === "light") {
      root.setAttribute("data-theme", "light");
    } else if (themeMode === "system") {
      // Handle system theme
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }
  }, [themeMode]);

  // Add system theme listener
  useEffect(() => {
    if (themeMode === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        document.documentElement.setAttribute(
          "data-theme",
          e.matches ? "dark" : "light"
        );
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [themeMode]);

  const settingList = [
    {
      name: "Themes & Toggles",
      description: "Customize your app appearance",
      icon: <Paintbrush size={20} className="setting-icon" />,
      dropdownProps: {
        options: {
          light: "Light Mode",
          dark: "Dark Mode",
          system: "System Default"
        },
        defaultValue: themeMode,
        handleChange: (e) => setThemeMode(e.target.value)
      }
    },
    {
      name: "View Saved Guides",
      description: "Access your previously saved guides",
      icon: <Download size={20} className="setting-icon" />,
      buttonProps: {
        onClick: () => console.log("View saved guides"),
        text: "View Guides",
        className: "primary"
      }
    },
    {
      name: "Account Management",
      description: "Manage your account settings and preferences",
      icon: <User size={20} className="setting-icon" />,
      buttonProps: {
        onClick: () => console.log("Account management"),
        text: "Manage Account",
        className: "primary"
      }
    },
    {
      name: "Feedback & Support",
      description: "Get help or send us your feedback",
      icon: <MessageSquare size={20} className="setting-icon" />,
      buttonProps: {
        onClick: () => window.open('mailto:support@example.com', '_blank'),
        text: "Contact Support",
        className: "primary"
      }
    },
    {
      name: "Clear Data",
      description: "Clear all locally stored data",
      icon: <Trash2 size={20} className="setting-icon" />,
      buttonProps: {
        onClick: () => {
          if (window.confirm("Are you sure you want to clear all data?")) {
            localStorage.clear();
            setClearDataConfirm(true);
          }
        },
        text: "Clear Data",
        className: "danger"
      }
    },
    {
      name: "Log out",
      description: "Sign out of your account",
      icon: <LogOut size={20} className="setting-icon" />,
      buttonProps: {
        onClick: () => {
          if (window.confirm("Are you sure you want to log out?")) {
            setIsLoggedIn(false);
            setClose(true);
          }
        },
        text: "Log Out",
        className: "danger"
      }
    }
  ];

  return (
    <div className={["drawer", close ? "" : "opened"].join(" ")}>
      <nav className="drawer-nav">
        <button className="back-button" onClick={() => setClose(!close)}>
          <BackIcon />
        </button>
        <h1>Settings</h1>
      </nav>
      
      <div className="settings-container">
        <ul className="setting-labels">
          {settingList.map((settingProps, key) => (
            <li key={key} className="setting-item">
              <SettingLabel {...settingProps} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SettingDrawer;
