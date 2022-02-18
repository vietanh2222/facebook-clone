import React from "react";
import "./Sidebar.css";
import SidebarRow from "./SidebarRow";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import PeopleIcon from "@mui/icons-material/People";
import ChatIcon from "@mui/icons-material/Chat";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useStateValue } from "../../store/StateProvider";
import { useNavigate } from "react-router-dom";

function Sidebar({ isHeaderClick, closeSideBarHeader }) {
  const [{ user }] = useStateValue();
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div
        onClick={() => {
          navigate(`/profile/me`, {
            state: { name: user.displayName, avatar: user.photoURL },
          });
          if (isHeaderClick) {
            closeSideBarHeader(false);
          }
        }}
      >
        <SidebarRow src={user.photoURL} title={user.displayName} />
      </div>
      <div
        onClick={() => {
          if (isHeaderClick) {
            closeSideBarHeader(false);
          }
        }}
      >
        <SidebarRow
          Icon={LocalHospitalIcon}
          title="COVID-19 Information Center"
        />
      </div>
      <div
        onClick={() => {
          if (isHeaderClick) {
            closeSideBarHeader(false);
          }
        }}
      >
        <SidebarRow Icon={EmojiFlagsIcon} title="Pages" />
      </div>

      <div
        onClick={() => {
          navigate("friends");
          if (isHeaderClick) {
            closeSideBarHeader(false);
          }
        }}
      >
        <SidebarRow Icon={PeopleIcon} title="Friends" />
      </div>
      <div
        onClick={() => {
          if (isHeaderClick) {
            closeSideBarHeader(false);
          }
        }}
      >
        <SidebarRow Icon={ChatIcon} title="Messenger" />
      </div>
      <div
        onClick={() => {
          if (isHeaderClick) {
            closeSideBarHeader(false);
          }
        }}
      >
        <SidebarRow Icon={StorefrontIcon} title="Marketplace" />
      </div>
      <div
        onClick={() => {
          if (isHeaderClick) {
            closeSideBarHeader(false);
          }
        }}
      >
        <SidebarRow Icon={VideoLibraryIcon} title="Videos" />
      </div>
      <div
        onClick={() => {
          if (isHeaderClick) {
            closeSideBarHeader(false);
          }
        }}
      >
        <SidebarRow Icon={ExpandMoreIcon} title="Matketplace" />
      </div>
    </div>
  );
}

export default Sidebar;
