import { isDevelopmentSite } from './utils';
import { useEffect, useState } from 'react';
import mixpanel from 'mixpanel-browser';
import { CONSTANTS } from './constants';
import { Provider } from "react-redux";
import { Dashboard } from './pages';
import './App.css';

function App({ store }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    loadMixPanel();
    loadTheme();
  }, []);

  const loadMixPanel = () => {
    if(!(isDevelopmentSite())){
      mixpanel.init(
        CONSTANTS.MIXPANEL_TOKEN,
        { 
          track_pageview: true,
          persistence: 'localStorage' 
        }
      );
    }
  }

  const loadTheme = () => {
    // setTheme(store.getValue("theme") || "light");
  }

  return (
    <Provider store={store}>
        <div className={`App ${theme || "light"}-theme`}>
          <Dashboard />
        </div>
    </Provider>
  );
}

export default App;
