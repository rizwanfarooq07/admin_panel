import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import Table from "./Table";
import Footer from "./Footer";

const LazyTable = lazy(() => import("./Table"));
const LazyFooter = lazy(() => import("./Footer"));

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [search, setSearch] = useState("");
  const [ids, setIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [checked, setChecked] = useState(false);

  const data = async () => {
    const names = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    setAdmins(names.data);
    setUpdatedData(names.data);
  };

  useEffect(() => {
    data();
  }, []);

  useEffect(() => {
    setAdmins([]);
    const searchValue = updatedData.filter(
      (admin) =>
        admin.name.toLowerCase().includes(search.toLowerCase()) ||
        admin.email.toLowerCase().includes(search.toLowerCase()) ||
        admin.role.toLowerCase().includes(search.toLowerCase())
    );
    search !== "" ? setAdmins(searchValue) : setAdmins(updatedData);
  }, [search, ids, updatedData]);

  const indexOfLastItem = itemsPerPage * currentPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = updatedData
    .filter(
      (admin) =>
        admin.name.toLowerCase().includes(search.toLowerCase()) ||
        admin.email.toLowerCase().includes(search.toLowerCase()) ||
        admin.role.toLowerCase().includes(search.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <div>
            <input
              placeholder="Search admin by typing into the field..."
              className="search"
              type="text"
              name=""
              id=""
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

            <LazyTable
              ids={ids}
              setIds={setIds}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              updatedData={updatedData}
              search={search}
              setUpdatedData={setUpdatedData}
              checked={checked}
              setChecked={setChecked}
            />
            <LazyFooter
              updatedData={updatedData}
              setUpdatedData={setUpdatedData}
              ids={ids}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              admins={admins}
              itemsPerPage={itemsPerPage}
              currentItems={currentItems}
              setChecked={setChecked}
            />
          </div>
        </section>
      </Suspense>
    </>
  );
};

export default Admin;
