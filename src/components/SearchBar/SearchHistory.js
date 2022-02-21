import React from "react";
import "./SearchHistory.css";
import db from "../../pages/home/firebase";
import { doc } from "firebase/firestore";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteDoc } from "firebase/firestore";

function SearchHistory({
  searchKey,
  name,
  avatar,
  isFriend,
  closeSearchBar,
  historyId,
  listSearch,
}) {
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    closeSearchBar();
    if (searchKey !== "") {
      const searchResult = listSearch.filter((contact) =>
        contact.name.trim().toLowerCase().includes(searchKey.toLowerCase())
      );
      navigate("/search", { state: searchResult });
    } else {
      navigate(`profile/${name.replace(/\s/g, "")}`, {
        state: { name, avatar, isFriend },
      });
    }
  };
  const handleRemoveSearchHistory = async (e) => {
    e.stopPropagation();
    await deleteDoc(doc(db, "searchHistories", historyId));
  };

  return (
    <div className="searchHistory" onClick={handleGoToProfile}>
      <Avatar src={avatar} />
      <p>{searchKey !== "" ? searchKey : name}</p>
      <CloseIcon onClick={handleRemoveSearchHistory} />
    </div>
  );
}

export default SearchHistory;
