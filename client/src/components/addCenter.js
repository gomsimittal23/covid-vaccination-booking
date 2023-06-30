import React, { useState } from "react";
import "./Home.css";

export const AddCenter = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [doses, setDoses] = useState("");
  const [date, setDate] = useState("");
  const [workingHours, setWorkingHours] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new center object
    const newCenter = {
      name,
      location,
      doses,
      date,
      workingHours,
    };
    console.log(newCenter);

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/addCenter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCenter),
      });
      if (response.ok) {
        console.log("added");
        alert("added")
        // Center successfully added
        // Update the centerData state or refetch the data to reflect the changes
        // onCenterAdded(newCenter);
      } else {
        // Handle the case where the server responded with an error
        console.log("Failed to add center");
      }
    } catch (error) {
      // Handle the error case
      console.log("Error adding center:", error);
    }

    // Reset form inputs
    setName("");
    setLocation("");
    setDoses("");
    setDate("");
    setWorkingHours("");
  };

  return (
    <div className="add-center-form">
      <h2 className="form-title">Add Center</h2>
      <form>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="location">
            Location
          </label>
          <input
            className="form-control"
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="doses">
            Doses Available
          </label>
          <input
            className="form-control"
            type="number"
            id="doses"
            name="doses"
            value={doses}
            onChange={(e) => setDoses(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="date">
            Date
          </label>
          <input
            className="form-control"
            type="text"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="workingHours">
            Working Hours
          </label>
          <input
            className="form-control"
            type="text"
            id="workingHours"
            name="workingHours"
            value={workingHours}
            onChange={(e) => setWorkingHours(e.target.value)}
          />
        </div>
        <button className="btn btn-submit" type="submit" onClick={handleSubmit}>
          Add Center
        </button>
      </form>
    </div>
  );
};
export default AddCenter;
