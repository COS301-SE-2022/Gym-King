import React, { Component } from 'react'
import Gym from './Gym';
import Identifications from './Identifications';
import Password from './Password';

export class RegisterForm extends Component {

    state = {
        slide:1, 
        name:"", 
        surname: "", 
        username: "", 
        email:"", 
        phone: "", 
        password:"",
        gym:""
    }

    nextSlide = () => {
        const { slide } = this.state;
        this.setState({
          slide: slide + 1
        });
    };

    prevSlide = () => {
        const { slide } = this.state;
        this.setState({
            slide: slide - 1
        });
    };

    handleChange = (input:any, e:any) => {
        this.setState({ [input]: e.target.value });
    };
  render() {
    const { slide } = this.state;
    const { name, surname, username, email, phone, password, gym } = this.state;
    const values = { name, surname, username, email, phone, password, gym }
        switch (slide) {
            case 1:
              return (
                <Identifications
                  next={this.nextSlide}
                  handleChange={this.handleChange}
                  values={values}
                />
              );
            case 2:
              return (
                <Password
                  next={this.nextSlide}
                  prev={this.prevSlide}
                  handleChange={this.handleChange}
                  values={values}
                />
              );
            case 3:
              return (
                <Gym
                  next={this.nextSlide}
                  prev={this.prevSlide}
                  values={values}
                  handleChange={this.handleChange}
                />
              );
            default:
          }
    
  }
}

export default RegisterForm