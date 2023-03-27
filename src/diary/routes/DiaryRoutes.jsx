import { Navigate, Route, Routes } from "react-router-dom"
import { DiaryPage } from "../pages/DiaryPage"

export const DiaryRoutes = () => {
 
  return (
    <Routes>
        <Route path="/" element={ <DiaryPage /> } />

        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}
