import { useEffect, useState } from "react";
import axios from "axios";

export default function ManagePriority() {
  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentPriority, setCurrentPriority] = useState({ id: null, name: "" });
  const [newPriority, setNewPriority] = useState({ name: "" });

  // Fetch all priorities from backend
  useEffect(() => {
    const fetchPriorities = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/priorities");
        setPriorities(res.data);
      } catch (err) {
        console.error("Error fetching priorities:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPriorities();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setNewPriority({ ...newPriority, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setCurrentPriority({ ...currentPriority, [e.target.name]: e.target.value });
  };

  // Add Priority
  const handleAddPriority = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/priorities", newPriority);
      setPriorities([...priorities, res.data]);
      setShowAddModal(false);
      setNewPriority({ name: "" });
    } catch (err) {
      console.error("Error adding priority:", err);
    }
  };

  // Edit Priority
  const handleEditPriority = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8080/api/priorities/${currentPriority.id}`,
        { name: currentPriority.name }
      );
      setPriorities(
        priorities.map((priority) =>
          priority.id === currentPriority.id ? res.data : priority
        )
      );
      setShowEditModal(false);
      setCurrentPriority({ id: null, name: "" });
    } catch (err) {
      console.error("Error updating priority:", err);
    }
  };

  // Delete Priority
  const handleDeletePriority = async (id) => {
    if (!window.confirm("Are you sure you want to delete this priority?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/priorities/${id}`);
      setPriorities(priorities.filter((priority) => priority.id !== id));
    } catch (err) {
      console.error("Error deleting priority:", err);
    }
  };

  // View Priority
  const handleViewPriority = (priority) => {
    setCurrentPriority(priority);
    setShowViewModal(true);
  };

  if (loading) return <p>Loading priorities...</p>;

  return (
    <div>
      <h2 className="mb-4">Manage Priority</h2>

      <div className="d-flex justify-content-end my-3">
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + Add Priority
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
          {priorities.length > 0 ? (
            priorities.map((priority) => (
              <tr key={priority.id}>
                <td>{priority.id}</td>
                <td>{priority.name}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      setCurrentPriority(priority);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDeletePriority(priority.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleViewPriority(priority)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No priorities available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Priority Modal */}
      {showAddModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleAddPriority}>
                <div className="modal-header">
                  <h5 className="modal-title">Add Priority</h5>
                  <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Priority Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={newPriority.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Priority</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Priority Modal */}
      {showEditModal && currentPriority && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleEditPriority}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Priority</h5>
                  <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Priority Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={currentPriority.name}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Update Priority</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Priority Modal */}
      {showViewModal && currentPriority && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Priority</h5>
                <button type="button" className="btn-close" onClick={() => setShowViewModal(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>ID:</strong> {currentPriority.id}</p>
                <p><strong>Name:</strong> {currentPriority.name}</p>
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
