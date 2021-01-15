import React from 'react';
import {signIn} from '../actions';
import {signOut} from '../actions';
import {connect} from 'react-redux';


class GoogleAuth  extends React.Component{
    componentDidMount(){
        window.gapi.load("client:auth2",()=>{
            window.gapi.client.init({
                clientId:'198269755939-fkpt88md6b49klma09pt1fbpt8a1m9n4.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.authUpdate(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.authUpdate);
            }); 
        });
    }
    authUpdate = (isSignedIn)=>{
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }
        else{
            this.props.signOut();
        }
    };
    onSignInClick = ()=>{
        this.auth.signIn();
    }
    onSignOutClick = ()=>{
        this.auth.signOut();
    }
    googleAuthButton(){
        if(this.props.isSignedIn === null){
            return null;
        }
        else if(this.props.isSignedIn === true){
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            );
        }
        else{
            return (
                <button onClick={this.onSignInClick}className="ui red google button">
                    <i className="google icon"/>
                    Sign In with Google
                </button>
            );
        }
    }
    render(){
    return <div>{this.googleAuthButton()}</div>
    }
}
const mapStateToProps = (state)=>{
    return {isSignedIn:state.auth.isSignedIn}
}

export default connect(mapStateToProps,{signIn:signIn,signOut:signOut})(GoogleAuth);