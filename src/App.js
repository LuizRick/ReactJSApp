import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Root,{TopBar} from "components/layout/";


const Loading = () => <div>Loading...</div>;

const Home = Loadable({
  loader: () => import('./routes/Home'),
  loading: Loading,
});

const About = Loadable({
  loader: () => import('./routes/About'),
  loading: Loading,
});

const LastMangaChapter = Loadable({
  loader: () => import("./routes/LastMangaChapter"),
  loading:Loading
});

class App extends Component {
  render() {
    return (
      <Router>
        <Root>
          <TopBar class="topbar"/>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/lastmangachapter" component={LastMangaChapter} />
        </Root>
      </Router>
    );
  }
}

export default App;
