import React from "react";

//We will convert this from a function (const), to a render function
class Signin extends React.Component {
    //to get an input value for the email and password. we create the state using constructor:
    //In order to use props, we pass props in the function
    constructor(props) {
        super(props);
        this.state = {
            SigninEmail: '',
            SigninPassword: ''
        }
    }

    //then we make use of the created state:
    onEmailChange = (event) => {
        this.setState({SigninEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({SigninPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://faceid-app.onrender.com/signin/', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify ({
                email: this.state.SigninEmail,
                password: this.state.SigninPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
    }

    
    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br4 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                  <main className="pa4 black-80">
                  <div className="measure">
                  <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                      <div className="mt3">
                      <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                      <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            onChange={this.onEmailChange}
                         />
                      </div>
                      <div className="mv3">
                      <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                      <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange={this.onPasswordChange}
                        />
                      </div>
                      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
                  </fieldset>
                  <div className="">
                      <input 
                          onClick={this.onSubmitSignIn}
                          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                          type="submit" 
                          value="Sign in"
                       />
                  </div>
                  <div className="lh-copy mt3">
                      <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                  </div>
                  </div>
              </main>
            </article>
          );
    }
}

export default Signin;