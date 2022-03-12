import React from "react";
import {connect} from "react-redux"
import { Route, Switch } from "react-router-dom";

import "./App.css";

import Header from './Components/Header/header.component.jsx';
import HomePage from "./Pages/Homepage/homepage.component.jsx";
import ShopPage from "./Pages/shop/shop.component.jsx";
import SignInAndSignUp from "./Pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx";
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import {setCurrentUser} from './redux/user/user.actions';

class App extends React.Component {


  unsubscribeFromAuth = null

  componentDidMount() {

    const {setCurrentUser} = this.props;
  
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({ 
            id: snapShot.id,
            ...snapShot.data()
            
          }, () => {
            console.log(this.state);
          }
          );
        });
        
      }
      else{
        this.setState( userAuth);
      }
     
    })
  }
  
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return(
    <div className="App">
    <Header />  
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/signin" render={() => this.props.currentUser ? (<Redirect to ='/' />) : (<SignInAndSignUp />)}/>
      </Switch>
    </div>
    );
  };
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
