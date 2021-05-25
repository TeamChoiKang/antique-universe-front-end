import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Router>
      <>
        <Switch>
          <Route path="/" exact>
            <div>main</div>
          </Route>
          <Route path="/signin">
            <div>signin</div>
          </Route>
          <Route path="/signup">
            <div>signup</div>
          </Route>
          <Route path="/game">
            <div>game</div>
          </Route>
          <Route path="*">
            <div>404</div>
          </Route>
        </Switch>
      </>
    </Router>
  );
};

export default AppRouter;
