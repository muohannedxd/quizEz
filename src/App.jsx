import Landing from "./components/landing";
import Main from "./components/main";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/Main" element={<Main />}></Route>
      </Routes>
    </div>
  );
}

export default App;

/**
 * basics of routers, first install it running `npm i react-router-dom`
 * before starting, wrap the app with browserRouter in index.js
 * Route: a single router (has a path="url" and an element="component_togo")
 * Routes: wraps all route elemnts, all routes are in the bottom of the return component
 * use link tags with to=path_of_route defined
 */

/**
 * Notes: 
 * 1. Link is with a capital L :)
 * 2. in the app, always define what the root is (like here it is Landing)
 *  in order to separate the Landing from the Main
 */
