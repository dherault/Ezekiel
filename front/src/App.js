import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Provider as StateProvider } from 'react-redux'
import { PersistGate as PersistenceProvider } from 'redux-persist/integration/react'
import { ThemeProvider } from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'

import ApplicationLayout from './components/ApplicationLayout'
import Space from './scenes/Space'
import Psyche from './scenes/Psyche'

import store from './state'
import theme from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StateProvider store={store}>
        <PersistenceProvider
          loading={null}
          persistor={store.persistor}
        >
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/psyche"
              >
                <ApplicationLayout>
                  <Psyche />
                </ApplicationLayout>
              </Route>
              <Route
                exact
                path="/space"
              >
                <ApplicationLayout>
                  <Space />
                </ApplicationLayout>
              </Route>
              <Redirect
                from="/"
                to="/psyche"
              />
            </Switch>
          </BrowserRouter>
        </PersistenceProvider>
      </StateProvider>
    </ThemeProvider>
  )
}

export default App
