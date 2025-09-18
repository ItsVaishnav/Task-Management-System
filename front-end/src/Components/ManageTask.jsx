
export default function ManageTask() {
  return (
    <div>
      <h2 className="mb-4">Manage Tasks</h2>

      {/* Filters */}
      <div className="d-flex mb-3">
        <select className="form-select me-2" style={{ maxWidth: "200px" }}>
          <option>All Assignees</option>
          <option>Anil</option>
          <option>Faizan</option>
          <option>Anuj</option>
        </select>

        <select className="form-select me-2" style={{ maxWidth: "200px" }}>
          <option>All Statuses</option>
          <option>ToDo</option>
          <option>In-Progress</option>
          <option>Completed</option>
        </select>

        <button className="btn btn-primary">Filter</button>
        <button className="btn btn-success ms-auto">+ Add Task</button>
      </div>

      {/* Task Table */}
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
          <tr>
            <td>1</td>
            <td>string</td>
            <td>Anil</td>
            <td>ToDo</td>
            <td>Low</td>
            <td>
              <button className="btn btn-warning btn-sm me-2">Edit</button>
              <button className="btn btn-danger btn-sm me-2">Delete</button>
              <button className="btn btn-success btn-sm">View</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>test</td>
            <td>Faizan</td>
            <td>In-Progress</td>
            <td>Medium</td>
            <td>
              <button className="btn btn-warning btn-sm me-2">Edit</button>
              <button className="btn btn-danger btn-sm me-2">Delete</button>
              <button className="btn btn-success btn-sm">View</button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>work on healthcare admin page</td>
            <td>Anuj</td>
            <td>In-Progress</td>
            <td>Medium</td>
            <td>
              <button className="btn btn-warning btn-sm me-2">Edit</button>
              <button className="btn btn-danger btn-sm me-2">Delete</button>
              <button className="btn btn-success btn-sm">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
