import App from "./containers/App";
import NotFoundPage from "./containers/NotFoundPage";
import HomePage from "./containers/HomePage";

import GamesPage from "./containers/GamesPage";
import GameTimeline from "./containers/GameTimeline";
import GameNews from "./containers/GameNews";
// import GameSettings from "./containers/GameNews";

import NewGamePage from "./containers/NewGamePage";
import GamePage from "./containers/GamePage";
import EditGamePage from "./containers/EditGamePage";
import Register from "./containers/Register";
import Login from "./containers/Login";
import GitHubLogPage from "./containers/GitHubLogPage";

import requireAuthentication from './components/AuthenticatedComponent';

export default {
  path: '/',
  component: App,
  indexRoute: { component: HomePage },
  childRoutes: [
    { path: 'register', component: Register },
    { path: 'github', component: GitHubLogPage },
    { path: 'login', component: Login },
    { path: 'games', component: GamesPage },
    { path: 'games/new', component: NewGamePage },
    {
      path: 'games/:slug',
      component: GamePage,
      indexRoute: { component: GameTimeline },
      childRoutes: [
        { path: 'news', component: GameNews },
        // { path: '/settings', component: GameSettings },
      ]
    },
    {
      path: 'games/:slug/edit', component: requireAuthentication(EditGamePage),
      indexRoute: { component: GameTimeline }, // GameSettings here
    },
    { path: '*', component: NotFoundPage },
  ]
};
