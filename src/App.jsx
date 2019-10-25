import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import routes from './router/routes'

function App() {
  return (
    <Router>
      {routes.map(route => (
        <Route key={route.path} {...route} />
      ))}
    </Router>
  )
}

export default App
