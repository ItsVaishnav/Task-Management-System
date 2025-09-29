import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageRole() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentRole, setCurrentRole] = useState({ id: null, name: "" });
  const [newRole, setNewRole] = useState({ name: "" });
  const [currentUserRole, setCurrentUserRole] = useState(null);

  // Fetch roles from backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/userRoles");
        setRoles(res.data);
      } catch (err) {
        console.error("Error fetching roles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setNewRole({ ...newRole, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setCurrentRole({ ...currentRole, [e.target.name]: e.target.value });
  };

  // Add Role
  const handleAddRole = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/userRoles",
        newRole
      );
      setRoles([...roles, res.data]);
      setShowAddModal(false);
      setNewRole({ name: "" });
    } catch (err) {
      console.error("Error adding role:", err);
    }
  };

  // Edit Role
  const handleEditRole = async (e) => {
    e.preventDefault();

    if (!currentRole || !currentRole.id) return;

    try {
      // Send the updated role name to backend
      const res = await axios.put(
        `http://localhost:8080/api/userRoles/${currentRole.id}`,
        { role: { name: currentRole.name } } // <- match backend structure
      );

      // Update the roles state
      setRoles(
        roles.map((ur) =>
          ur.id === currentRole.id ? { ...ur, role: res.data.role } : ur
        )
      );

      setShowEditModal(false);
      setCurrentRole({ id: null, name: "" });
      console.log("Control Role is ", currentRole);
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };
  // Delete Role
  const handleDeleteRole = async (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/userRoles/${id}`);
      setRoles(roles.filter((role) => role.id !== id));
    } catch (err) {
      console.error("Error deleting role:", err);
    }
  };

  // View Role
  const handleViewRole = (role) => {
    setCurrentRole(role);
    setShowViewModal(true);
  };

  if (loading) return <p>Loading roles...</p>;

  return (
    <div>
      <h2 className="mb-4">Manage Role</h2>

      <div className="d-flex justify-content-end my-3">
        <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          + Add Role
        </button>
      </div>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.length > 0 ? (
            roles.map((role) => (
              <tr key={role.id}>
                <td>{role.id}</td>
                <td>{role.role.name}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      setCurrentRole({ id: role.id, name: role.role.rollName });
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleViewRole(role)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No roles available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Role Modal */}
      {showAddModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleAddRole}>
                <div className="modal-header">
                  <h5 className="modal-title">Add Role</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Role Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={newRole.name}
                      onChange={handleChange}
                      required
                    />
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
                    Save Role
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {showEditModal && currentRole && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleEditRole}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Role</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Role Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={currentRole.name}
                      onChange={handleEditChange}
                      required
                    />
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
                    Update Role
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Role Modal */}
      {showViewModal && currentRole && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Role</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowViewModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>ID:</strong> {currentRole.id}
                </p>
                <p>
                  <strong>Name:</strong> {currentRole.name}
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
