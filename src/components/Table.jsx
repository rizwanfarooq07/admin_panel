import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";

const Table = ({
  ids,
  setIds,
  itemsPerPage,
  currentPage,
  updatedData,
  search,
  setUpdatedData,
  checked,
  setChecked,
}) => {
  const [id, setId] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedRole, setUpdatedRole] = useState("");
  const [edit, setEdit] = useState(false);

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

  const handleBulkCheck = () => {
    setChecked(!checked);
    const ids = currentItems.map((admin) => admin.id);
    !checked ? setIds(ids) : setIds([]);
  };

  const handleCheck = (i) => {
    if (ids.length === 0) {
      setIds([...ids, i]);
    } else {
      if (ids.includes(i)) {
        const updatedIds = ids.filter((ids) => ids !== i);
        setIds(updatedIds);
      } else {
        setIds([...ids, i]);
      }
    }
  };

  const handleDelete = (id) => {
    const filter = updatedData.filter((admin) => admin.id !== id);
    setUpdatedData(filter);
  };

  const handleEdit = (i, name, email, role) => {
    setUpdatedName(name);
    setUpdatedEmail(email);
    setUpdatedRole(role);
    setId(i);
    setEdit(!edit);
    // setIds([...ids, i]);
    const updatedAdmin = updatedData.map((admin) =>
      admin.id === i
        ? {
            ...admin,
            name: updatedName !== "" ? updatedName : admin.name,
            email: updatedEmail !== "" ? updatedEmail : admin.email,
            role: updatedRole !== "" ? updatedRole : admin.role,
          }
        : admin
    );

    setUpdatedData(updatedAdmin);
    // setAdmins(updtedAdmin);
    edit && setUpdatedName("") && setUpdatedEmail("") && setUpdatedRole("");
  };

  const editAdmins = (admin) => (
    <tr key={admin.id} className={ids.includes(admin.id) ? "checked" : ""}>
      <td>
        <input
          type="checkbox"
          checked={ids.includes(admin.id)}
          onChange={() => handleCheck(admin.id)}
        />
      </td>
      <td>
        {" "}
        <input
          type="text"
          name="edit"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          name="edit"
          value={updatedEmail}
          onChange={(e) => setUpdatedEmail(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          name="edit"
          value={updatedRole}
          onChange={(e) => setUpdatedRole(e.target.value)}
        />
      </td>
      <td>
        {" "}
        <IconButton onClick={() => handleDelete(admin.id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={() =>
            handleEdit(admin.id, admin.name, admin.email, admin.role)
          }
        >
          <UpgradeIcon />
        </IconButton>
      </td>
    </tr>
  );

  const renderAdmins = (admin) => (
    <tr key={admin.id} className={ids.includes(admin.id) ? "checked" : ""}>
      <td>
        <input
          type="checkbox"
          checked={ids.includes(admin.id)}
          onChange={() => handleCheck(admin.id)}
        />
      </td>
      <td>{admin.name}</td>
      <td>{admin.email}</td>
      <td>{admin.role}</td>
      <td>
        {" "}
        <IconButton onClick={() => handleDelete(admin.id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={() =>
            handleEdit(admin.id, admin.name, admin.email, admin.role)
          }
        >
          <EditIcon />
        </IconButton>
      </td>
    </tr>
  );

  const mappedData = currentItems.map((admin) =>
    id === admin.id && edit ? editAdmins(admin) : renderAdmins(admin)
  );

  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={checked}
              onChange={handleBulkCheck}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{mappedData}</tbody>
    </table>
  );
};

export default Table;
