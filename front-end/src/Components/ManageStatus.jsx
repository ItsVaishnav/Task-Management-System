import React from 'react'

export default function ManageStatus() {
  return (
    <div>
      <h2 className="mb-4">Manage Tasks</h2>
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
  )
}
