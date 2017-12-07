import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './components/Layout'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const App = () => (
  <MuiThemeProvider>
    <Layout />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
