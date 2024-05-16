import React from 'react'
import {MaintenanceComponent} from "../components/MaintenanceSection/MaintenanceComponent"
export default function Help() {
  return (
    <div className="flex justify-center items-center" style={{ height: "calc(100dvh - 253px)" }}>
        {<MaintenanceComponent/>}
    </div>
  )
}
