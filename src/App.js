import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from './Components/Header/header.component.jsx';
import HomePage from "./Pages/Homepage/homepage.component.jsx";
import ShopPage from "./Pages/shop/shop.component.jsx";
import SignInAndSignUp from "./Pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx";
import { auth, createUserProfileDocument } from './firebase/firebase.utils'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({ currentUser: {
            id: snapShot.id,
            ...snapShot.data()
            
          }});
        });
        
      }
     this.setState({currentUser: userAuth});
    })
  }
  
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return(
    <div className="App">
    <Header currentUser={this.state.currentUser} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={SignInAndSignUp} />
      </Switch>
    </div>
    );
  };
}

export default App;
