import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e) => {
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

      setForm({
        name: "",
        dob: "",
        email: "",
      });
    } catch (err) {
      console.error(err);
    }
    alert("login successfully");
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleClick}>
        <h1>Register Form</h1>

        <div className="input-group">
          <label htmlFor="name">Name:</label>

          <input
            type="text"
            id="name"
            name="name"
            required
            onChange={handleChange}
            value={form.name}
          />
        </div>

        <br />

        <div className="input-group">
          <label htmlFor="dob">DOB:</label>

          <input
            type="date"
            id="dob"
            name="dob"
            required
            onChange={handleChange}
            value={form.dob}
          />
        </div>

        <br />

        <div className="input-group">
          <label htmlFor="email">Email:</label>

          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={handleChange}
            value={form.email}
          />
        </div>

        <br />

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
