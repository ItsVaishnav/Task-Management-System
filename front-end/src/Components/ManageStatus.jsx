import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageStatus() {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState({ id: null, name: "" });
  const [newStatus, setNewStatus] = useState({ name: "" });

  // Fetch all statuses
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/statuses");
        setStatuses(res.data);
      } catch (err) {
        console.error("Error fetching statuses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatuses();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setNewStatus({ ...newStatus, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setCurrentStatus({ ...currentStatus, [e.target.name]: e.target.value });
  };

  // Add status
  const handleAddStatus = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/statuses", newStatus);
      setStatuses([...statuses, res.data]);
      setShowAddModal(false);
      setNewStatus({ name: "" });
    } catch (err) {
      console.error("Error adding status:", err);
    }
  };

  // Edit status
  const handleEditStatus = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8080/api/statuses/${currentStatus.id}`,
        { name: currentStatus.name }
      );
      setStatuses(
        statuses.map((status) =>
          status.id === currentStatus.id ? res.data : status
        )
      );
      setShowEditModal(false);
      setCurrentStatus({ id: null, name: "" });
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Delete status
  const handleDeleteStatus = async (id) => {
    if (!window.confirm("Are you sure you want to delete this status?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/statuses/${id}`);
      setStatuses(statuses.filter((status) => status.id !== id));
    } catch (err) {
      console.error("Error deleting status:", err);
    }
  };

  // View status
  const handleViewStatus = (status) => {
    setCurrentStatus(status);
    setShowViewModal(true);
  };

  if (loading) return <p>Loading statuses...</p>;

  return (
    <div>
      <h2 className="mb-4">Manage Status</h2>

      <div className="d-flex justify-content-end my-3">
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + Add Status
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
          {statuses.length > 0 ? (
            statuses.map((status) => (
              <tr key={status.id}>
                <td>{status.id}</td>
                <td>{status.name}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      setCurrentStatus(status);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDeleteStatus(status.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleViewStatus(status)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No statuses available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Status Modal */}
      {showAddModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleAddStatus}>
                <div className="modal-header">
                  <h5 className="modal-title">Add Status</h5>
                  <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Status Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={newStatus.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Status</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Status Modal */}
      {showEditModal && currentStatus && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleEditStatus}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Status</h5>
                  <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Status Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={currentStatus.name}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Update Status</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Status Modal */}
      {showViewModal && currentStatus && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Status</h5>
                <button type="button" className="btn-close" onClick={() => setShowViewModal(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>ID:</strong> {currentStatus.id}</p>
                <p><strong>Name:</strong> {currentStatus.name}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
