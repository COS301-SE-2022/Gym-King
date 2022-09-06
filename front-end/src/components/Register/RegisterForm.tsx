import React, { Component } from 'react'
import Contact from './Contact';
import Gym from './Gym';
import Identifications from './Identifications';
import Password from './Password';
import axios from "axios";
export type props = { history:any/*, showSuccessToast:any, showError1Toast:any, showError2Toast:any*/};


export class RegisterForm extends Component<props> {

    
    state = {
        slide:1, 
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
        console.log(input);
        this.setState({ [input]: e.target.value });
    };

    register = () =>{
        let formData = {
            name:sessionStorage.getItem("regName"), 
            surname: sessionStorage.getItem("regSurname"), 
            username: sessionStorage.getItem("regUsername"), 
            email:sessionStorage.getItem("regEmail"), 
            phone: sessionStorage.getItem("regNumber"), 
            password:sessionStorage.getItem("regPassword"),
            gym:sessionStorage.getItem("regGym")
        }
        console.log(formData);

        this.createUser(formData);
        
    }

    createUser=(formData:any)=>{
        axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user`,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          data: { 
              email: formData.email,
              name: formData.name,
              surname: formData.surname,
              number: formData.phone,
              username: formData.username,
              password:formData.password,
           }
          })
        .then(response =>response.data)
        .then(response =>{
            //show toast
            if(response.results.success){
              //this.props.showSuccessToast()

              //redirect to login
              this.props.history.push("/Login")
            }else{
              console.log( response.results);
              //code:23505 = user already exists 
              if(response.results.code ==="23505")
              {
                //this.props.showError1Toast()
              }
              else
              {
                //this.props.showError2Toast()
              }
            }
        })
        .catch(err => { 
            console.log(err)
            //this.props.showError2Toast()
        }) 
    }

  render() {
    const { slide } = this.state;
        switch (slide) {
            case 1:
              return (
                <Identifications
                  next={this.nextSlide}
                  handleChange={this.handleChange}
                  history ={this.props.history}
                />
              );
            case 2:
              return (
                <Contact
                  next={this.nextSlide}
                  prev={this.prevSlide}
                  handleChange={this.handleChange}
                />
              );
            case 3:
              return (
                <Password
                  next={this.nextSlide}
                  prev={this.prevSlide}
                  handleChange={this.handleChange}
                />
              );
            case 4:
              return (
                <Gym
                  next={this.register}
                  prev={this.prevSlide}
                  handleChange={this.handleChange}
                />
              );
            default:
          }
    
  }
}

export default RegisterForm