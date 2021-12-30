import React from "react";
import PrivateRoute from './Routes/PrivateRoute'
import PublicRoute from './Routes/PublicRoute'
import {
  Switch
} from "react-router-dom"

import Entry from './Screens/Entry'
import Coworker from './Screens/coworker'
import NotFound from "./Screens/notfound";
import Overview from "./Screens/Overview";
import AddGame from "./Screens/addGame";
import Settings from "./Screens/settings";
import Detailview from "./Screens/Detailview";
import EditGame from "./Screens/editGame";

function Routes() {
    return (

      
        <Switch>

          <PrivateRoute restricted={false} component={Entry} path="/" exact />
          <PrivateRoute restricted={false} component={Coworker} path="/members" exact />
          <PrivateRoute restricted={false} component={Overview} path="/overview" exact />
          <PrivateRoute restricted={false} component={AddGame} path="/addgame" exact />
          <PrivateRoute restricted={false} component={EditGame} path="/editgame" exact />
          <PrivateRoute restricted={false} component={Settings} path="/settings" exact />
          <PrivateRoute restricted={false} component={Detailview} path="/gamedetail" exact />

          <PublicRoute restricted={false} component={NotFound}/>
 
        </Switch>
     
  
    )
}

export default Routes;