import * as React from 'react'
import AllItem from '../pages/AllItem'
import Ladies from '../pages/Ladies'
import Mens from '../pages/Mens'
import Kids from '../pages/Kids'
import Entame from '../pages/Entame'
import ShowItem from '../pages/ShowItem'
import Navigation from '../components/Navigation'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <div className="l-body">
            <Switch>
              <Route exact path="/">
                <AllItem />
              </Route>
              <Route path="/all-items">
                <AllItem />
              </Route>
              <Route path="/ladies">
                <Ladies />
              </Route>
              <Route path="/mens">
                <Mens />
              </Route>
              <Route path="/baby-kids">
                <Kids />
              </Route>
              <Route path="/entame">
                <Entame />
              </Route>
              <Route path="/items/:id">
                <ShowItem />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
