import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  const [centerData, setCenterData] = useState([]);
  useEffect(() => {
    // Fetch center data from MongoDB server
    const fetchCenterData = async () => {
      const centers = {};
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/viewCenter`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(centers),
          }
        );
        const data = await response.json();
        // console.log(data);
        setCenterData(data);
      } catch (error) {
        console.log("Error fetching center data:", error);
      }
    };

    fetchCenterData();
  }, []);
  // const centerData = [
  //   {
  //     name: "ABC Vaccination Center",
  //     location: "123 Main Street, City",
  //     dosesAvailable: 100,
  //     date: "June 30, 2023",
  //     workingHours: "9:00 AM - 5:00 PM",
  //   },
  //   {
  //     name: "XYZ Vaccination Center",
  //     location: "456 Park Avenue, Town",
  //     dosesAvailable: 50,
  //     date: "July 1, 2023",
  //     workingHours: "8:00 AM - 4:00 PM",
  //   },
  //   // Add more center data as needed
  // ];
  const [searchQuery, setSearchQuery] = useState("");
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("adminInfo")) {
      setAdmin(true);
    }

    if (localStorage.getItem("userInfo")) {
      setUser(true);
    }

    // console.log(login);
  }, []);
  // setAdmin(admin);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCenters = centerData.filter((center) => {
    const { name = "", doses, workingHours = "" } = center;
    const lowerCaseQuery = searchQuery?.toLowerCase() || "";
    const dosageString = String(doses || ""); // Convert dosage to a string
    return (
      name.toLowerCase().includes(lowerCaseQuery) ||
      dosageString.toLowerCase().includes(lowerCaseQuery) || // Apply toLowerCase() on dosageString
      workingHours.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const handleRemoveCenter = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/removeCenter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      if (response.ok) {
        alert("Removed Center successfully");
        window.location.reload();
      } else {
        alert("");
        console.log("failed");
      }
    } catch (error) {
      console.error("Error occurred during Remove:", error);
      alert(error);
    }
  };
  const handleBookSlot = async () => {
    try {
      const response = await fetch();
      if (response.ok) {
        alert("Slot Booked");
        // window.location.reload();
      } else {
        alert("");
        console.log("failed");
      }
    } catch (err) {
      alert("Slot Booked");
    }
  };

  return (
    <div>
      <div className="add-center-form">
        <Link to="/addCenter">{admin && <button>Add Center</button>}</Link>
      </div>
      <input
        className="search-input"
        type="text"
        placeholder="Search by name, dosage, or working hours"
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul className="card-list">
        {filteredCenters.map((center, index) => (
          <li key={index} className="card">
            <img
              src="https://www.pngall.com/wp-content/uploads/2017/01/Doctor-Needle-PNG-Clipart.png"
              alt="Icon"
              className="card-icon"
            />
            <div className="card-content">
              <h1>{center.name}</h1>
              <p>Location: {center.location}</p>
              <p>Doses Available: {center.doses}</p>
              <p>Date: {center.date}</p>
              <p>Working Hours: {center.workingHours}</p>
              {admin && (
                <button
                  onClick={() => handleRemoveCenter(center._id)}
                  className="remove-button"
                >
                  Remove Center
                </button>
              )}
              {user && (
                <button
                  onClick={() => handleBookSlot(center._id)}
                  className="remove-button"
                >
                  Book Slot
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
