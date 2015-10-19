import App from "./containers/App";
import NotFoundPage from "./containers/NotFoundPage";
import HomePage from "./containers/HomePage";
import GamesPage from "./containers/GamesPage";
import NewGamePage from "./containers/NewGamePage";
import GamePage from "./containers/GamePage";
import EditGamePage from "./containers/EditGamePage";
import LogPage from "./containers/LogPage";
import GitHubLogPage from "./containers/GitHubLogPage";

export default {
  path: '/',
  component: App,
  indexRoute: { component: HomePage },
  childRoutes: [
    { path: 'register', component: LogPage },
    { path: 'github', component: GitHubLogPage },
    { path: 'login', component: LogPage },
    { path: 'games', component: GamesPage },
    { path: 'games/new', component: NewGamePage },
    { path: 'games/:slug', component: GamePage },
    { path: 'games/:slug/edit', component: EditGamePage },
    { path: '*', component: NotFoundPage },
  ]
};
