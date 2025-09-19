import { useEffect, useState } from "react";
import axios from "axios";
import useAuthContext from "../context/AuthContext";

export default function ManageTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    assignee: "",
    status: "ToDo",
    priority: "Low",
  });

  const { userData } = useAuthContext();
  const role = userData?.roles?.[0] || "guest";

  // Fetch tasks
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8080/api/tasks");
  //       setTasks(res.data);
  //     } catch (err) {
  //       console.error("Error fetching tasks:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchTasks();
  // }, []);

  // Handle input changes in modal
  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Add new task
  const handleAddTask = async (e) => {
    console.log("New TAsk", newTask);
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/tasks", newTask);
      setTasks([...tasks, res.data]); // append new task
      setShowModal(false); // close modal
      setNewTask({ title: "", assignee: "", status: "ToDo", priority: "Low" }); // reset form
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <h2 className="mb-4">Manage Tasks</h2>

      {/* Only superadmin and admin can add tasks */}
      {(role === "superadmin" || role === "admin") && (
        <div className="d-flex justify-content-end my-3">
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            + Add Task
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="d-flex mb-3">
        <select className="form-select me-2" style={{ maxWidth: "600px" }}>
          <option>All Assignees</option>
        </select>
        <select className="form-select me-2" style={{ maxWidth: "600px" }}>
          <option>All Statuses</option>
          <option>ToDo</option>
          <option>In-Progress</option>
          <option>Completed</option>
        </select>
        <button className="btn btn-primary">Filter</button>
      </div>

      {/* Tasks Table */}
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Assignee</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.assignee}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2">Edit</button>
                  <button className="btn btn-danger btn-sm me-2">Delete</button>
                  <button className="btn btn-success btn-sm">View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No tasks available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Task Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleAddTask}>
                <div className="modal-header">
                  <h5 className="modal-title">Add Task</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={newTask.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Assignee</label>
                    <input
                      type="text"
                      className="form-control"
                      name="assignee"
                      value={newTask.assignee}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={newTask.status}
                      onChange={handleChange}
                    >
                      <option value="1">ToDo</option>
                      <option value="2">In-Progress</option>
                      <option value="3">Completed</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select"
                      name="priority"
                      value={newTask.priority}
                      onChange={handleChange}
                    >
                      <option value="3">Low</option>
                      <option value="2">Medium</option>
                      <option value="1">High</option>
                    </select>
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
                    Save Task
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
