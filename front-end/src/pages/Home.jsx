import React from "react";
import ThreeColLayout from "../layouts/ThreeColLayout";
// import { FormControl } from "react-bootstrap";
import HomeSidebar from "../components/HomeSidebar";
import ProfileListView from "../components/ProfileListview";
import Feed from "../components/Feed";

const Home = () => {
    return (
        <ThreeColLayout 
          leftContent={<HomeSidebar />}
          centerContent={< Feed />}
          rightContent={<ProfileListView />}
        />
    )
}

export default Home