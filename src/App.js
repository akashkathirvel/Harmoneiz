import { useDispatch, useSelector } from "react-redux";
import { isDevelopmentSite } from './utils';
import mixpanel from 'mixpanel-browser';
import { rootActions } from './actions';
import { CONSTANTS } from './constants';
import { Dashboard } from './pages';
import { useEffect } from 'react';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { root } = useSelector((state) => state.root);

  useEffect(() => {
    loadMixPanel();
    loadRootData();
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

  const loadRootData = () => {
    dispatch(rootActions.get());
  }

  return (
    <div className={`App ${(root.theme) ? "dark" : "light"}-theme`}>
      <Dashboard />
    </div>
  );
}

export default App;
