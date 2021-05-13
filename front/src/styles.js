import 'flexpad/dist/flexpad.css'
import 'mpxx/mpxx.min.css'
import './index.css'

import theme from './theme'

const css = `
*::selection {
  color: white;
  background-color: ${theme.palette.secondary.main};
}
.color-primary {
  color: ${theme.palette.red[500]};
}
.background-color-primary {
  background-color: ${theme.palette.red[500]};
}
.background-color-grey-300 {
  background-color: ${theme.palette.grey[300]};
}
.green {
  color: ${theme.palette.green[500]};
}
`

// Inject CSS if on browser
if (typeof window !== 'undefined') {
  // Attach CSS to document
  const head = document.head || document.getElementsByTagName('head')[0]
  const style = document.createElement('style')

  head.appendChild(style)
  style.appendChild(document.createTextNode(css))
}
