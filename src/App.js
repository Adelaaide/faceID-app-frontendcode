import React, { Component } from "react";
import './App.scss';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Rank from './Components/Rank/Rank';
import ParticlesBg from 'particles-bg';

// Set initial state
const initialState ={
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // Load user data into state
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  // Calculate face location
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

  // Display face box
  displayFaceBox = (box) => {
    this.setState({ box });
  }

  // Handle input change
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  // Submit picture
  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch('https://faceid-app.onrender.com/rankurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify ({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        this.displayFaceBox(this.calculateFaceLocation(response))
        fetch('https://faceid-app.onrender.com/rank', {
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
    })
    .catch(err => console.log(err));
  }
  
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    } else {
      this.setState({route: route});
    }
  }   
  
  render() {
    const { isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <ParticlesBg className="particlesbg" num="200" type="circle" bg={true} />
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
      </div>
    );
  }
}



export default App;
