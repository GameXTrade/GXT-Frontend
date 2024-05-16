import React from 'react'
import { useParams } from 'react-router-dom'
import {MaintenanceComponent} from "../components/MaintenanceSection/MaintenanceComponent"


export default function ProductPage() {
    const { productId } = useParams();


    return (
    <div className="flex justify-center items-center " style={{ height: "calc(100dvh - 253px)" }}>
        <h4>{<MaintenanceComponent/>}</h4>
    </div>
  )
}
