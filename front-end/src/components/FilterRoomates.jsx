import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const FilterRoommates = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    gender: [],
    education: "",
    smoking: "",
    foodPreferences: [],
    country: "",
  });

  const handleCheckboxChange = (category, value) => {
    // Special handling for "any" in food preferences
    if (category === "foodPreferences" && value === "any") {
      setFilters((prev) => ({
        ...prev,
        [category]: prev[category].includes(value) ? [] : ["any"],
      }));
    } else {
      // Deselect "any" if another food preference is selected
      setFilters((prev) => ({
        ...prev,
        [category]:
          value === "any"
            ? []
            : [...prev[category].filter((item) => item !== "any"), value],
      }));
    }
  };

  const handleRadioChange = (category, value) => {
    setFilters((prev) => ({ ...prev, [category]: value }));
  };

  const handleSelectChange = (category, value) => {
    setFilters((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmit = () => {
    onApplyFilters(filters); // Pass filters to parent
  };

  return (
    <div className="p-3 pt-5" style={{ backgroundColor: "#f2f2f2", height: "100vh" }}>
      {/* Gender Preference */}
      <Form.Group className="mb-4">
        <p style={{ fontWeight: "bold", color: "#8B0000" }}>Gender Preference</p>
        <div>
        {/* <label htmlFor="radio-male" className="visually-hidden">Male </label> */}
          <Form.Check type="checkbox" id="radio-male" label="male" onChange={() => handleCheckboxChange("gender", "male")} />
          {/* <label htmlFor="radio-female" className="visually-hidden">Female </label> */}

          <Form.Check type="checkbox" id="radio-female" label="female" onChange={() => handleCheckboxChange("gender", "female")} />
          

          {/* <label htmlFor="radio-nb" className="visually-hidden">Non Binary </label> */}

          <Form.Check
            type="checkbox"
            id="radio-nb"
            label="non-binary"
            onChange={() => handleCheckboxChange("gender", "non-binary")}
          />
          {/* <label htmlFor="radio-np" className="visually-hidden">Prefer Not To Say </label> */}
          <Form.Check
            type="checkbox"
            label="prefer not to say"
            id="radio-np"
            onChange={() => handleCheckboxChange("gender", "prefer not to say")}
          />
        </div>
      </Form.Group>

      {/* Education */}
      <Form.Group className="mb-4">
        {/* <p style={{ fontWeight: "bold", color: "#8B0000" }}>Education</p> */}
        <Form.Label htmlFor="education-select" style={{ fontWeight: "bold", color: "#8B0000" }}>
    Education
  </Form.Label>
        <Form.Select id="education-select"  defaultValue="" onChange={(e) => handleSelectChange("education", e.target.value)}>
          <option value="" disabled>Please select your education level</option>
          <option value="Masters - Computer Science">Masters - Computer Science</option>
          <option value="Bachelors - Engineering">Bachelors - Engineering</option>
          <option value="PhD - Data Science">PhD - Data Science</option>
          <option value="Hospitality Management">Hospitality Management</option>
        </Form.Select>
      </Form.Group>

      {/* Smoking */}
      <Form.Group className="mb-4">
      <fieldset>
      <legend style={{ fontWeight: "bold", color: "#8B0000" }}>Smoking</legend>
        {/* <p style={{ fontWeight: "bold", color: "#8B0000" }}>Smoking</p> */}
        <div className="d-flex align-items-center">
        {/* <label htmlFor="radio-smoking-false" className="visually-hidden">False </label> */}
          <Form.Check
            type="radio"
            label="false" // Matches the database field
            name="smoking"
            className="me-2"
            id="radio-smoking-false"
            onChange={() => handleRadioChange("smoking", "false")}
          />
          {/* <label htmlFor="radio-smoking-true" className="visually-hidden">True </label> */}
          <Form.Check
            type="radio"
            label="true" // Matches the database field
            name="smoking"
            id="radio-smoking-true"
            onChange={() => handleRadioChange("smoking", "true")}
          />
        </div>
        </fieldset>
      </Form.Group>

      {/* Food Preferences */}
      <Form.Group className="mb-4">
        <p style={{ fontWeight: "bold", color: "#8B0000" }}>Food Preference</p>
        <div>
        {/* <label htmlFor="radio-any" className="visually-hidden">Any </label> */}
          <Form.Check
            type="checkbox"
            label="any"
            id="radio-any"
            onChange={() => handleCheckboxChange("foodPreferences", "any")}
          />
          {/* <label htmlFor="radio-veg" className="visually-hidden">Veg </label> */}
          <Form.Check
            type="checkbox"
            label="Vegetarian"
            id="radio-veg"
            onChange={() => handleCheckboxChange("foodPreferences", "Vegetarian")}
          />
          {/* <label htmlFor="radio-nv" className="visually-hidden">Non Veg </label> */}
          <Form.Check
            type="checkbox"
            label="Non-Veg"
            id="radio-nv"
            onChange={() => handleCheckboxChange("foodPreferences", "Non-Veg")}
          />
          {/* <label htmlFor="radio-vegan" className="visually-hidden">Vegan </label> */}
          <Form.Check
            type="checkbox"
            label="Vegan"
            id="radio-vegan"
            onChange={() => handleCheckboxChange("foodPreferences", "Vegan")}
          />
        </div>
      </Form.Group>

      {/* Country of Origin */}
      <Form.Group className="mb-4">
        <p style={{ fontWeight: "bold", color: "#8B0000" }}>Country of Origin</p>
        <Form.Select onChange={(e) => handleSelectChange("country", e.target.value)}>
          <option value="">Select</option>
          <option value="Flexible">Flexible</option>
          <option value="United States">United States</option>
          <option value="India">India</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
        </Form.Select>
      </Form.Group>

      {/* Apply Filters Button */}
      <Button variant="primary" onClick={handleSubmit}>
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterRoommates;
