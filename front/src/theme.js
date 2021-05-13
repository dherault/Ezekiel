import { createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import green from '@material-ui/core/colors/green'
import grey from '@material-ui/core/colors/grey'
import indigo from '@material-ui/core/colors/indigo'
import orange from '@material-ui/core/colors/orange'
import red from '@material-ui/core/colors/red'

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: blue,
    blue,
    indigo,
    green,
    orange,
    red,
    grey,
  },
})

export default theme
