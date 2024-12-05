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
        <Form.Label style={{ fontWeight: "bold", color: "#8B0000" }}>Gender Preference</Form.Label>
        <div>
          <Form.Check type="checkbox" label="male" onChange={() => handleCheckboxChange("gender", "male")} />
          <Form.Check type="checkbox" label="female" onChange={() => handleCheckboxChange("gender", "female")} />
          <Form.Check
            type="checkbox"
            label="non-binary"
            onChange={() => handleCheckboxChange("gender", "non-binary")}
          />
          <Form.Check
            type="checkbox"
            label="prefer not to say"
            onChange={() => handleCheckboxChange("gender", "prefer not to say")}
          />
        </div>
      </Form.Group>

      {/* Education */}
      <Form.Group className="mb-4">
        <Form.Label style={{ fontWeight: "bold", color: "#8B0000" }}>Education</Form.Label>
        <Form.Select onChange={(e) => handleSelectChange("education", e.target.value)}>
          <option value="">Select</option>
          <option value="Masters - Computer Science">Masters - Computer Science</option>
          <option value="Bachelors - Engineering">Bachelors - Engineering</option>
          <option value="PhD - Data Science">PhD - Data Science</option>
          <option value="Hospitality Management">Hospitality Management</option>
        </Form.Select>
      </Form.Group>

      {/* Smoking */}
      <Form.Group className="mb-4">
        <Form.Label style={{ fontWeight: "bold", color: "#8B0000" }}>Smoking</Form.Label>
        <div className="d-flex align-items-center">
          <Form.Check
            type="radio"
            label="false" // Matches the database field
            name="smoking"
            className="me-2"
            onChange={() => handleRadioChange("smoking", "false")}
          />
          <Form.Check
            type="radio"
            label="true" // Matches the database field
            name="smoking"
            onChange={() => handleRadioChange("smoking", "true")}
          />
        </div>
      </Form.Group>

      {/* Food Preferences */}
      <Form.Group className="mb-4">
        <Form.Label style={{ fontWeight: "bold", color: "#8B0000" }}>Food Preference</Form.Label>
        <div>
          <Form.Check
            type="checkbox"
            label="any"
            onChange={() => handleCheckboxChange("foodPreferences", "any")}
          />
          <Form.Check
            type="checkbox"
            label="Vegetarian"
            onChange={() => handleCheckboxChange("foodPreferences", "Vegetarian")}
          />
          <Form.Check
            type="checkbox"
            label="Non-Veg"
            onChange={() => handleCheckboxChange("foodPreferences", "Non-Veg")}
          />
          <Form.Check
            type="checkbox"
            label="Vegan"
            onChange={() => handleCheckboxChange("foodPreferences", "Vegan")}
          />
        </div>
      </Form.Group>

      {/* Country of Origin */}
      <Form.Group className="mb-4">
        <Form.Label style={{ fontWeight: "bold", color: "#8B0000" }}>Country of Origin</Form.Label>
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
