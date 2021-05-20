import { Provider as GraphQLProvider } from 'urql'
import { Provider as StateProvider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'

import DataSubscriber from './components/DataSubscriber'
import Timer from './components/Timer'
import Space from './Space'

import store from './state'
import client from './client'
import theme from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StateProvider store={store}>
        <GraphQLProvider value={client}>
          <DataSubscriber />
          <Timer />
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/"
              >
                <Space />
              </Route>
              <Route path="*">
                Not found.
              </Route>
            </Switch>
          </BrowserRouter>
        </GraphQLProvider>
      </StateProvider>
    </ThemeProvider>
  )
}

export default App
