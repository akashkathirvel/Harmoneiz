import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from 'react';
import { isDevelopmentSite } from './utils';
import mixpanel from 'mixpanel-browser';
import { rootActions } from './actions';
import { CONSTANTS } from './constants';
import { Dashboard } from './pages';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { root } = useSelector((state) => state.root);

  const loadRootData = useCallback(() => {
    dispatch(rootActions.get());
  }, [dispatch]);

  useEffect(() => {
    loadMixPanel();
    loadRootData();
  }, [loadRootData]);

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

  return (
    <div className={`App ${(root.theme) ? "dark" : "light"}-theme`}>
      <Dashboard />
    </div>
  );
}

export default App;
