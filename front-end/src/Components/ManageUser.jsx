export default function ManageUser() {
  return (
    <div>
      <h2 className="mb-4">Manage Priority</h2>
      <div className="d-flex justify-content-end my-3">
        <button className="btn btn-primary">+ Add Task</button>
      </div>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mob</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>string</td>
            <td></td>
            <td>vaishq@hmdi.voem</td>
            <td>uoigejfnd cp7 98o3iefydt8uyuyrw9e8 fisjdgi</td>
            <td>
              <button className="btn btn-warning btn-sm me-2">Edit</button>
              <button className="btn btn-danger btn-sm me-2">Delete</button>
              <button className="btn btn-success btn-sm">View</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>test</td>
            <td></td>
            <td>vaishq@hmdi.voem</td>
            <td>uoigejfnd cp7 98o3iefydt8uyuyrw9e8 fisjdgi</td>
            <td>
              <button className="btn btn-warning btn-sm me-2">Edit</button>
              <button className="btn btn-danger btn-sm me-2">Delete</button>
              <button className="btn btn-success btn-sm">View</button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>work on healthcare admin page</td>
            <td></td>
            <td>vaishq@hmdi.voem</td>
            <td>uoigejfnd cp7 98o3iefydt8uyuyrw9e8 fisjdgi</td>
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
