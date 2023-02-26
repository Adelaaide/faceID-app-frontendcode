import React, { Component } from "react";
import './App.scss';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Rank from './Components/Rank/Rank.js';
import ParticlesBg from 'particles-bg';
import Footer from "./Components/Footer/Footer";

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: "Signin",
  isSignedIn: false,
  //update use profile on the front end:
  user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
  }
}
class App extends Component {
  constructor () {
    super ();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }


  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input})
        fetch('http://localhost:3008/rankurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify ({
              input: this.state.input
          })
        })
        .then(response => response.json())
          .then(response => {
            if (response) {
              fetch('http://localhost:3008/rank', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify ({
                    id: this.state.user.id
                })
              })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count}))
              })
                .catch(console.log);
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log(err));
    }


    onRouteChange = (route) => {
      if (route === 'signout') {
         this.setState(initialState);
          } else if (route === 'home') {
            this.setState({isSignedIn: true})
          }
          this.setState({route: route});
        }   


  render() {
     const { isSignedIn, imageUrl, route, box} = this.state;
  return (
    <div className="App">
      <div>
         <ParticlesBg className="particlesbg" num="50" type="circle" bg={true} />
      </div>
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
          {route === 'home'
              ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange}
                onPictureSubmit={this.onPictureSubmit}
                />
              <FaceRecognition box={box} imageUrl={imageUrl} />
              </div>
      : (
        route === "Signin" 
        ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      )
       
      
      }
      <div className="page-container">
        <div className="content-wrap">
         </div>
           <Footer />
        </div>
    </div>
  );
}
}

export default App;
