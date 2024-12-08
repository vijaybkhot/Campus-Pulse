import React, { useState } from "react";
import TwoColLayoutLeft from "../layouts/TwoColLayoutLeft";
import FilterRoommates from "../components/FilterRoomates";
import RoommateGrid from "../components/RoomateGrid";

const FindRoommates = () => {
  const [filters, setFilters] = useState({}); // State to track selected filters

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters); // Update filters when applied in FilterRoommates
  };

  return (
    <TwoColLayoutLeft
      leftContent={<FilterRoommates onApplyFilters={handleApplyFilters} />}
      centerContent={<RoommateGrid filters={filters} />} // Pass filters to RoommateGrid
    />
  );
};

export default FindRoommates;
