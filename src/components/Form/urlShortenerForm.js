import React from 'react';
import UrlShortenerService from '../../requestsHandler/urlShortenerService.js'
import {ErrorHandling} from '../../requestsHandler/helper.js';

export default class UrlShortenerForm extends React.Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this)
    }
    
    state = {
        shortLink : '',
        url : '',
        message : <p></p>,
        errors : {
            shortLink : '',
            url : ''
        }      
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.isFormValid(this.state.errors)){
            if (this.props.isCreateAction)
                this.createLink();
            else
                this.editLink();
        }       
    }

    handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        let errors = this.validateForm(name, value);

        this.setState({
            message : '',
            errors,
            [name] : value
        })
    }

    createLink(){
        let input = { 
            shortLink : this.state.shortLink, 
            url : this.state.url
        }

        UrlShortenerService.api.create(input)
        .then(res => { 
            this.setState({
            message : <p aria-label="message" style={{color : 'green'}}>{res.data}</p>,
            url : '',
            shortLink : ''
            }, () => {
                
                this.myForm.reset();
                this.props.UpdateTable();
            }) 
            
            setTimeout(() => {this.setState({message : ''})}, 3000);
        })
        .catch(err => { 
            this.createAndEditErrorHandler(err);           
        })
    }

    editLink(){
        let input = {
            shortLink : this.state.shortLink, 
            url : this.state.url
        }
        UrlShortenerService.api.edit(this.props.editItem.id, input)
        .then(res => { 
            this.setState({
            message : <p style={{color : 'green'}}>{res.data}</p>,
            url : '',
            shortLink : '',
            }, () => {
                
                this.myForm.reset();

                this.props.UpdateTable();
                this.props.GoBackToCreate();
            })
            
            setTimeout(() => {this.setState({message : ''})}, 3000);
        })
        .catch(err => {       
            this.createAndEditErrorHandler(err);
        })
    }

    // called by parent when to change form from create to edit
    ChangeStateToEdit(){
            this.myForm.reset();

            this.setState({
                url : this.props.editItem.url,
                shortLink : this.props.editItem.shortLink,
                message : '',
                errors : {
                    url : '',
                    shortLink : ''
                }
            })
    }

    validateForm(targetName, targetValue){
        let errors = this.state.errors;

        if (targetName === 'shortLink'){
            errors.shortLink = (targetValue.length < 3 || targetValue.length > 20) 
            ? <p style={{color : 'red'}}>Short link value should be between 3 and 20 characters</p> 
            : ''
        }
            
        var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+= &%@! \-/]))?/;    

        if (targetName === 'url')
            errors.url = pattern.test(targetValue) ? '' : <p style={{color : 'red'}}>Invalid URL</p>

        return errors;    
    }

     isFormValid = (errors) => {
        let valid = true;
        Object.values(errors).forEach(value => {
            if (value)
                valid = false;
          });
        return valid;
      }

      createAndEditErrorHandler(err){

        if (!err.response){
            this.setState({
                message : <p style = {{color : 'red'}}>Server Error</p>
            })
        }// my custom server response 
        else if (typeof err.response.data === 'string'){
            this.setState({
                message : <p style = {{color : 'red'}}>{err.response.data}</p>
                })
        } // model state errors
        else{
            let errors = err.response.data.errors;

            let errorFromServer = ErrorHandling(errors);
            
            // server returns an array of array(each error per input), so i need to create a double map
            this.setState({
            message : errorFromServer.map((array, i) => 
                <ul key={i}>{array.map((item, i) => 
                    <li key={i} style={{color : 'red'}}>
                        {item}</li>)}
                </ul>)
            })
        }       
      }

      render(){
        let title = ''
        let buttonText = ''

        if (this.props.isCreateAction){
            title = <h3>Create your link here</h3>
            buttonText = 'create'
        }
        else{
            title = <h3>Edit your link here</h3>
            buttonText = 'edit'           
        }

        return (
            <div>
                 {title} 
                 <form data-testid="form" onSubmit={this.handleSubmit} ref ={el => {this.myForm = el}}>
                     <input 
                        aria-label="shortLinkInput" 
                        type="text" 
                        placeholder='ShortLink' 
                        onChange={this.handleChange} 
                        name="shortLink" 
                        defaultValue ={this.state.shortLink} 
                        required/>

                     <input 
                        style={{marginLeft : 5}}
                        data-testid="urlInput" 
                        type="text" placeholder='URL'  
                        onChange={this.handleChange} 
                        name="url" 
                        defaultValue={this.state.url} 
                        required/>

                    <input 
                        style={{marginLeft : 10}} 
                        aria-label="button" 
                        type="submit" 
                        value={buttonText} />      
                     
                    {this.state.errors.shortLink}

                    {this.state.errors.url}
                     
                </form>      

                {this.state.message} 
            </div>
          );
    }

}