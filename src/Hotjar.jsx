import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';

const HotjarTracker = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    hotjar.initialize({id:5226499, sv:6});
  }, []);

  useEffect(() => {
    hotjar.stateChange(location.pathname);
  }, [location]);

  return children;
};

export default HotjarTracker
