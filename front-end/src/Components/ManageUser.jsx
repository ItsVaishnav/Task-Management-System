import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]); // All possible roles (for dropdowns)
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    role: "", 
  });

  // Fetch users + roles
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch users
        const usersRes = await axios.get("http://localhost:8080/api/users");
        let fetchedUsers = usersRes.data;

        // 2. Fetch userRoles mapping
        const rolesRes = await axios.get("http://localhost:8080/api/userRoles");
        const userRolesData = rolesRes.data;

        // 3. Attach roles to each user
        fetchedUsers = fetchedUsers.map((u) => {
          const userRoles = userRolesData
            .filter((ur) => ur.user.id === u.id) // match user
            .map((ur) => ur.role.rollName); // extract role names
          return { ...u, roles: userRoles }; // attach roles array
        });

        setUsers(fetchedUsers);

        // 4. Extract unique roles for dropdowns
        const extractedRoles = [
          ...new Set(userRolesData.map((item) => item.role.name)),
        ];
        setRoles(extractedRoles);

        // 5. Set default role for forms
        if (extractedRoles.length > 0) {
          setCurrentUser((prev) => ({ ...prev, role: extractedRoles[0] }));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Input change handler
  const handleChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  // Add user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/users", currentUser);
      setUsers([...users, { ...res.data, roles: [currentUser.role] }]);
      setShowAddModal(false);
      setCurrentUser({ id: null, name: "", email: "", password: "", role: roles[0] || "" });
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  // Edit user
  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8080/api/users/${currentUser.id}`,
        currentUser
      );
      setUsers(
        users.map((u) =>
          u.id === currentUser.id ? { ...res.data, roles: [currentUser.role] } : u
        )
      );
      setShowEditModal(false);
      setCurrentUser({ id: null, name: "", email: "", password: "", role: roles[0] || "" });
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // View user
  const handleView = (user) => {
    setCurrentUser(user);
    setShowViewModal(true);
  };

  // Open edit modal
  const handleEditClick = (user) => {
    setCurrentUser({
      ...user,
      role: user.roles?.[0] || "", // pick first role for editing
    });
    setShowEditModal(true);
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h2 className="mb-4">Manage Users</h2>
      <div className="d-flex justify-content-end my-3">
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + Add User
        </button>
      </div>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Roles</th> {/* Show roles */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.roles?.join(", ") || "No Role"}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleView(user)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No users available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleAddUser}>
                <div className="modal-header">
                  <h5 className="modal-title">Add User</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {["name", "email", "password"].map((field) => (
                    <div className="mb-3" key={field}>
                      <label className="form-label">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name={field}
                        value={currentUser[field]}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ))}
                  {/* Role dropdown */}
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      name="role"
                      value={currentUser.role}
                      onChange={handleChange}
                      required
                    >
                      {roles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleEditUser}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit User</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {["name", "email", "password"].map((field) => (
                    <div className="mb-3" key={field}>
                      <label className="form-label">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name={field}
                        value={currentUser[field]}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ))}
                  {/* Role dropdown */}
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      name="role"
                      value={currentUser.role}
                      onChange={handleChange}
                      required
                    >
                      {roles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View User Modal */}
      {showViewModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowViewModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {["id", "name", "email", "password"].map((field) => (
                  <p key={field}>
                    <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>{" "}
                    {currentUser[field]}
                  </p>
                ))}
                <p>
                  <strong>Roles:</strong> {currentUser.roles?.join(", ") || "No Role"}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
