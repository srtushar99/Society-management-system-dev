

import { Link } from "react-router-dom"
import { MaintenanceTable } from "./MaintenanceTable"
import ResidentSidebar from "../../Resident Sidebar/ResidentSidebar"
import Header from "../../../Dashboard/Header/HeaderBaner"

export default function ViewMaintenance() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 flex justify-between items-center bg-white shadow-sm p-3">
        <div className="flex items-center md:ml-[100px] lg:ml-[340px] text-muted-foreground hidden sm:flex 2xl:ml-80">
          <Link
            to="/ResidentDashboard"
            className="text-muted-foreground no-underline font-semibold text-sm sm:text-base hover:text-primary"
          >
            Home
          </Link>
          <span className="mx-2 text-sm sm:text-base"> &gt; </span>
          <span className="font-semibold text-primary text-sm sm:text-base">
            Maintenance Invoices
          </span>
        </div>
        <Header />
      </header>
      
      <div className="flex">
        <ResidentSidebar />
       
      </div>
    </div>
  )
}

