import React, {useEffect} from 'react';
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import About from "./hoc/About/About";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Cars from "./containers/Cars/Cars";
import CarDetail from "./hoc/CarDetail/CarDetail";
import classes from './App.module.css';
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import Counter from "./containers/Counter/Counter";
import {connect} from "react-redux";
import LogOut from "./components/LogOut/LogOut";
import {autoLogin} from "./redux/actions/auth-actions";

function App(props) {
  useEffect(() => {
    props.autoLogin();
  });

  let routs = (
    <Switch>
      <Route path='/auth'
             component={Auth}
      />
      <Route path={'/about'}
             exact
             component={About}/>

      <Route path={'/404'}
             render={() => (
               <h1 className={classes.pageNotFound}>
                 404 Page Not Found
               </h1>)}
      />
      {/*<Redirect from={'*'} to={'404'} />*/}

    </Switch>);

  if (props.isAuthorized) {
    routs = (
      <Switch>
        <Route path={'/'}
               exact
               component={QuizList}
        />

        <Route path='/quiz-creator'
               component={QuizCreator}
        />

        <Route path={'/quiz/:id'}
               exact
               component={Quiz}
        />

        <Route path={'/quiz'}
               exact
               component={Quiz}
        />

        <Route path={'/about'}
               exact
               component={About}/>

        <Route path={'/cars/:name'}
               component={CarDetail}
        />

        <Route path={'/cars'}
               component={Cars}
        />

        <Route path={'/counter'}
               component={Counter}
        />

        <Route path={'/logout'} component={LogOut}/>

        {/*<Route path={'/404'}*/}
               {/*render={() => (*/}
                 {/*<h1 className={classes.pageNotFound}>*/}
                   {/*404 Page Not Found*/}
                 {/*</h1>)}*/}
        {/*/>*/}

        <Redirect from={'/auth'} to={'/'}/>

        {/*<Redirect from={'*'} to={'404'} />*/}
      </Switch>
    )
  }

  return (
    <Layout>
      {routs}
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    isAuthorized: !!state.auth.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
