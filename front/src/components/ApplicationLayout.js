import { Link as RouterLink } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import Manager from './Manager'

function ApplicationLayout({ children }) {

  function renderNav() {
    return (
      <AppBar position="relative">
        <Toolbar>
          <RouterLink to="/psyche">
            <Button
              variant="contained"
              className="mr-1"
            >
              ψ
            </Button>
          </RouterLink>
          <RouterLink to="/space">
            <Button
              variant="contained"
              className="mr-1"
            >
              φ
            </Button>
          </RouterLink>
        </Toolbar>
      </AppBar>
    )
  }

  return (
    <div className="w100vw h100vh y2s">
      {renderNav()}
      {children}
      <Manager />
    </div>
  )
}

export default ApplicationLayout
