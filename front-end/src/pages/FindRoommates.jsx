import React from "react"
import TwoColLayoutLeft from "../layouts/TwoColLayoutLeft"
import FilterRoomates from "../components/FilterRoomates"
import RoommateGrid from "../components/RoomateGrid"

const FindRoommates = () => {
    return (
        <TwoColLayoutLeft leftContent={<FilterRoomates />} centerContent={<RoommateGrid />}/>
    )
}

export default FindRoommates