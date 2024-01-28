import { isDevelopmentSite, store } from './utils';
import { useEffect, useState } from 'react';
import { CONSTANTS } from './constants';
import mixpanel from 'mixpanel-browser';
import { Dashboard } from './pages';
import './App.css';

function App() {
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
    setTheme(store.getValue("theme") || "light");
  }

  return (
    <div className={`App ${theme || "light"}-theme`}>
      <Dashboard />
    </div>
  );
}

export default App;
