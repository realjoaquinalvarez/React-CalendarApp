import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar/pages/CalendarPage"

export const AppRouter = () => {

  const authStatus = 'autenticated'
  
  
  return (
    <Routes>
      {
        ( authStatus === 'not-autenticated')
          ? <Route path='/auth/*' element={ <LoginPage /> } />
          : <Route path='/*' element={ <CalendarPage /> } />

      }
        
      <Route path='/*' element={ <Navigate to='/auth/login' /> } />
    </Routes>
  )
}
