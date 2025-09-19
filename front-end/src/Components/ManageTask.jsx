import { useEffect, useState } from "react";
import axios from "axios";
import useAuthContext from "../context/AuthContext";

export default function ManageTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [currentTask, setCurrentTask] = useState(null);
  const [newTask, setNewTask] = useState({ title: "" });

  const { userData } = useAuthContext();
  const role = userData?.roles?.[0] || "guest";

  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [filter, setFilter] = useState({ assignee: "", priority: "" });
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Fetch options (users, statuses, priorities)
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [usersRes, statusesRes, prioritiesRes] = await Promise.all([
          axios.get("http://localhost:8080/api/users"),
          axios.get("http://localhost:8080/api/statuses"),
          axios.get("http://localhost:8080/api/priorities"),
        ]);
        setUsers(usersRes.data);
        setStatuses(statusesRes.data);
        setPriorities(prioritiesRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOptions();
  }, []);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tasks");
      setTasks(res.data);
      setFilteredTasks(res.data); // initially show all tasks
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Add Task
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const payload = { title: newTask.title };
      const res = await axios.post("http://localhost:8080/api/tasks", payload);
      const updatedTasks = [...tasks, res.data];
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      setShowAddModal(false);
      setNewTask({ title: "" });
    } catch (err) {
      console.error(err);
    }
  };

  // Edit Task
  const handleEditTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8080/api/tasks/${currentTask.id}`,
        { ...currentTask }
      );
      const updatedTasks = tasks.map((t) =>
        t.id === res.data.id ? res.data : t
      );
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      setShowEditModal(false);
      setCurrentTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Task
  const handleDeleteTask = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${currentTask.id}`);
      const updatedTasks = tasks.filter((t) => t.id !== currentTask.id);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      setShowDeleteModal(false);
      setCurrentTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Filter tasks client-side
  const applyFilter = () => {
    const result = tasks.filter((task) => {
      return (
        (filter.assignee === "" ||
          task.assignee?.id === parseInt(filter.assignee)) &&
        (filter.priority === "" ||
          task.priority?.id === parseInt(filter.priority))
      );
    });
    setFilteredTasks(result);
  };

  const resetFilter = () => {
    setFilter({ assignee: "", priority: "" });
    setFilteredTasks(tasks);
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <h2 className="mb-4">Manage Tasks</h2>

      {(role === "superadmin" || role === "admin") && (
        <div className="d-flex justify-content-end my-3">
          <button
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            + Add Task
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="d-flex mb-3">
        <select
          className="form-select me-2"
          style={{ maxWidth: "200px" }}
          value={filter.assignee}
          onChange={(e) => setFilter({ ...filter, assignee: e.target.value })}
        >
          <option value="">All Assignees</option>
          {tasks.map((task) => (
            <option key={task.assignee?.id} value={task.assignee?.id}>
              {task.assignee?.name}
            </option>
          ))}
        </select>

        <select
          className="form-select me-2"
          style={{ maxWidth: "200px" }}
          value={filter.priority}
          onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
        >
          <option value="">All Priorities</option>
          <option value="3">Low</option>
          <option value="2">Medium</option>
          <option value="1">High</option>
        </select>

        <button className="btn btn-primary" onClick={applyFilter}>
          Filter
        </button>
        <button className="btn btn-secondary ms-2" onClick={resetFilter}>
          Reset
        </button>
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
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.assignee?.name || "-"}</td>
                <td>{task.status?.name || "-"}</td>
                <td>{task.priority?.name || "-"}</td>
                <td>{task.createdAt}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      setCurrentTask(task);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => {
                      setCurrentTask(task);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => {
                      setCurrentTask(task);
                      setShowViewModal(true);
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No tasks available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Task Modal */}
      {showAddModal && (
        <Modal
          title="Add Task"
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddTask}
          data={newTask}
          handleChange={handleChange}
        />
      )}

      {/* Edit Task Modal */}
      {showEditModal && currentTask && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleEditTask}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Task</h5>
                  <button
                    type="button" // <-- Important: prevent form submit
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {/* Title */}
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={currentTask.title}
                      onChange={(e) =>
                        setCurrentTask({
                          ...currentTask,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {/* Assignee */}
                  <div className="mb-3">
                    <label className="form-label">Assignee</label>
                    <select
                      className="form-select"
                      value={currentTask.assignee?.id || ""}
                      onChange={(e) =>
                        setCurrentTask({
                          ...currentTask,
                          assignee: { id: parseInt(e.target.value) },
                        })
                      }
                    >
                      <option value="">Select Assignee</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status */}
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      value={currentTask.status?.id || ""}
                      onChange={(e) =>
                        setCurrentTask({
                          ...currentTask,
                          status: { id: parseInt(e.target.value) },
                        })
                      }
                    >
                      <option value="">Select Status</option>
                      {statuses.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Priority */}
                  <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select"
                      value={currentTask.priority?.id || ""}
                      onChange={(e) =>
                        setCurrentTask({
                          ...currentTask,
                          priority: { id: parseInt(e.target.value) },
                        })
                      }
                    >
                      <option value="">Select Priority</option>
                      {priorities.map((priority) => (
                        <option key={priority.id} value={priority.id}>
                          {priority.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button" // <-- Important: prevent form submit
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Task Modal */}
      {showViewModal && currentTask && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Task</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowViewModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Title:</strong> {currentTask.title}
                </p>
                <p>
                  <strong>Assignee:</strong> {currentTask.assignee?.name || "-"}
                </p>
                <p>
                  <strong>Status:</strong> {currentTask.status?.name || "-"}
                </p>
                <p>
                  <strong>Priority:</strong> {currentTask.priority?.name || "-"}
                </p>
                <p>
                  <strong>Created At:</strong> {currentTask.createdAt}
                </p>
              </div>
              <div className="modal-footer">
                <button
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

      {/* Delete Task Modal */}
      {showDeleteModal && currentTask && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Task</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete task{" "}
                <strong>{currentTask.title}</strong>?
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDeleteTask}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Modal component
function Modal({ title, onClose, onSubmit, data, handleChange }) {
  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={onSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
