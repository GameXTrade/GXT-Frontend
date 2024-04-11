import NavBar from "../components/RootLayout";
import { Outlet } from "react-router-dom";
import BasicTable from "../components/TrendTable";
export default function Root() {
    return (
      <>
        <NavBar/>
        {/* <BasicTable/> */}
        <Outlet />
      </>
    );
  }