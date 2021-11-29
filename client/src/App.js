import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import { StoreProvider } from './state/GlobalState';
import { LandingHeader } from './components/LandingHeader';
import ErrorPage from './pages/404 page';
import sidebar from './components/Sidebar';
import CardKanban from './components/CardKanban';
import CanbanContainer from './components/CanbanContainer';
import FetchComponent from './components/Fetchcardtesting';
import NewCard from './components/NewCard';
import ProjectCard from './components/ProjectCards';
import Dashboard from './pages/dashboard';
import NewWorkspace from './components/NewWorkspace';
import Projects from './pages/Projects';
import RightSidebar from './components/RightSidebar';
import Asynchronous from './components/RepoAsync';
import PrivacyPolicy from './pages/Privacy Policy';
import GithubSync from './components/SyncGithub';
import MobileBar from './components/MobileBar';
import ComponentTesting from './pages/ComponentTesting';
import Profile from './pages/Profile';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <StoreProvider>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path = "/404" component={ErrorPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path = "/dashboard" component = {Dashboard}/>
            <Route exact path ="/projects" component = {Projects}/>
            {/* <Route exact path = "/newworkspace" component = {NewWorkspace}/> */}
            <Route exact path = "/profile" component = {Profile}/>
            <Route exact path = "/componenttesting" component = {Profile}/>
            <Route component={ErrorPage} />
          </Switch>
        </StoreProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
