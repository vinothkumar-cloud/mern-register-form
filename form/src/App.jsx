import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    email: "",
  });

  const [users, setUsers] = useState([]);

  // fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");

      const data = await response.json();

      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  // run once when page loads
  useEffect(() => {
    fetchUsers();
  }, []);

  // handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      console.log(data);

      // clear form
      setForm({
        name: "",
        dob: "",
        email: "",
      });

      // refresh users list
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });

      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="main">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Register Form</h1>

          <div className="input-group">
            <label>Name:</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>DOB:</label>

            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email:</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>

        <div className="users">
          <h2>Users</h2>

          {users.map((user) => (
            <div key={user._id} className="user-card">
              <p>
                <strong>Name:</strong> {user.name}
              </p>

              <p>
                <strong>DOB:</strong> {user.dob}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <button
                className="delete-btn"
                onClick={() => deleteUser(user._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
