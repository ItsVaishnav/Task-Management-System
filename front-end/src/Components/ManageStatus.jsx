import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageStatus() {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState({ name: "" });

  // Fetch all statuses from backend
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

  // Add new status
  const handleAddStatus = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/statuses",
        newStatus
      );
      setStatuses([...statuses, res.data]);
      setShowModal(false);
      setNewStatus({ name: "" });
    } catch (err) {
      console.error("Error adding status:", err);
    }
  };

  if (loading) return <p>Loading statuses...</p>;

  return (
    <div>
      <h2 className="mb-4">Manage Status</h2>

      <div className="d-flex justify-content-end my-3">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
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
                  <button className="btn btn-warning btn-sm me-2">Edit</button>
                  <button className="btn btn-danger btn-sm me-2">Delete</button>
                  <button className="btn btn-success btn-sm">View</button>
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
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleAddStatus}>
                <div className="modal-header">
                  <h5 className="modal-title">Add Status</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
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
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Status
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
