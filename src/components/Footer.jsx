import { IconButton } from "@mui/material";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const Footer = ({
  setCurrentPage,
  currentPage,
  admins,
  itemsPerPage,
  updatedData,
  setUpdatedData,
  ids,
  currentItems,
  setChecked,
}) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(admins.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const handlePage = (number) => {
    setCurrentPage(number);
  };

  const renderPageNumbers = pages.map((pageNumber) => (
    <li
      key={pageNumber}
      id={pageNumber}
      onClick={() => handlePage(pageNumber)}
      className={currentPage === pageNumber ? "active" : null}
    >
      {pageNumber}
    </li>
  ));

  const handleBulkDelete = () => {
    const filteredData = updatedData.filter(
      (admin) => !ids.some((id) => id === admin.id)
    );
    setUpdatedData(filteredData);
    ids.length === currentItems.length && setChecked(false);
  };
  return (
    <>
      <ul className="pageNumbers">
        <button className="btn-delete" onClick={handleBulkDelete}>
          Delete selected
        </button>
        <IconButton onClick={() => setCurrentPage(1)}>
          <KeyboardDoubleArrowLeftIcon />
        </IconButton>
        <IconButton
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        >
          <NavigateBeforeIcon />
        </IconButton>
        {renderPageNumbers}{" "}
        <IconButton
          onClick={() =>
            currentPage < Math.ceil(admins.length / itemsPerPage) &&
            setCurrentPage(currentPage + 1)
          }
        >
          <NavigateNextIcon />
        </IconButton>
        <IconButton
          onClick={() =>
            setCurrentPage(Math.ceil(admins.length / itemsPerPage))
          }
        >
          <KeyboardDoubleArrowRightIcon />
        </IconButton>
      </ul>
    </>
  );
};

export default Footer;
