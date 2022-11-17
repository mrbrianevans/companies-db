import {NavLink} from "react-router-dom";

function Home() {

  return (<div>
     Welcome to Companies DB.

      Get started with an API key: <NavLink to={'key'}>Manage Key</NavLink>

      These are our features: 1,2,3
</div>
  )
}

export default Home
