import { Navigate } from 'react-router-dom'
import { Session } from '../util/Session'

function RequireAuth({ children, adminOnly = false }) {
  const user = Session.getCurUser()

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (adminOnly && !user.admin) {
    return <Navigate to="/" replace />
  }

  return children
}

export default RequireAuth