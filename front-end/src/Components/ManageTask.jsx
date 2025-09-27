import { useEffect, useState } from "react";
import axios from "axios";
import useAuthContext from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.error("Failed to fetch options");
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
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
      toast.success("Task added successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add task");
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
      toast.success("Task updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task");
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
      toast.success("Task deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete task");
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
    toast.info("Filter applied");
  };

  const resetFilter = () => {
    setFilter({ assignee: "", priority: "" });
    setFilteredTasks(tasks);
    toast.info("Filter reset");
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <ToastContainer position="top-center" autoClose={2000} />
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
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
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
          {priorities.map((priority) => (
            <option key={priority.id} value={priority.id}>
              {priority.name}
            </option>
          ))}
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
            filteredTasks.map((task, i) => (
              <tr key={task.id}>
                <td>{i + 1}</td> {/* Serial number from 1 to n */}
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

      {/* Modals: Add/Edit/View/Delete */}
      {showAddModal && (
        <Modal
          title="Add Task"
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddTask}
          data={newTask}
          handleChange={handleChange}
        />
      )}

      {showEditModal && currentTask && (
        <EditModal
          task={currentTask}
          setTask={setCurrentTask}
          users={users}
          statuses={statuses}
          priorities={priorities}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditTask}
        />
      )}

      {showViewModal && currentTask && (
        <ViewModal task={currentTask} onClose={() => setShowViewModal(false)} />
      )}

      {showDeleteModal && currentTask && (
        <DeleteModal
          task={currentTask}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}

// Add Task Modal
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
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
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

// Edit Task Modal
function EditModal({
  task,
  setTask,
  users,
  statuses,
  priorities,
  onClose,
  onSubmit,
}) {
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={onSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Edit Task</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={task.title || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Assignee</label>
                <select
                  className="form-select"
                  name="assignee"
                  value={task.assignee?.id || ""}
                  onChange={(e) =>
                    setTask({
                      ...task,
                      assignee: users.find(
                        (u) => u.id === parseInt(e.target.value)
                      ),
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

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={task.status?.id || ""}
                  onChange={(e) =>
                    setTask({
                      ...task,
                      status: statuses.find(
                        (s) => s.id === parseInt(e.target.value)
                      ),
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

              <div className="mb-3">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  name="priority"
                  value={task.priority?.id || ""}
                  onChange={(e) =>
                    setTask({
                      ...task,
                      priority: priorities.find(
                        (p) => p.id === parseInt(e.target.value)
                      ),
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
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// View Task Modal
function ViewModal({ task, onClose }) {
  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Task Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              <strong>Title:</strong> {task.title}
            </p>
            <p>
              <strong>Assignee:</strong> {task.assignee?.name || "-"}
            </p>
            <p>
              <strong>Status:</strong> {task.status?.name || "-"}
            </p>
            <p>
              <strong>Priority:</strong> {task.priority?.name || "-"}
            </p>
            <p>
              <strong>Created At:</strong> {task.createdAt}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Delete Task Modal
function DeleteModal({ task, onClose, onDelete }) {
  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Delete</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Are you sure you want to delete <strong>{task.title}</strong>?
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                onDelete();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
