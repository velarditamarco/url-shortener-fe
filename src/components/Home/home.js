import React from 'react';
import UrlShortenerService from '../../requestsHandler/urlShortenerService';
import ShortLinkTable from '../Tables/shortlinkTable.js'
import UrlShortenerForm from '../Form/urlShortenerForm'

class Home extends React.Component{
    constructor(props){
        super(props)

        // reference to call child func from parent 
        this.formToUpdate = React.createRef();
    }

    state = {
        urls : [],
        editItem : {
            url : '',
            shortLink : ''
        },
        isCreateAction : true
    }
    render(){
        return (
            <div >
                <h1>Welcome to my Url shortener service</h1>
                <UrlShortenerForm ref={this.formToUpdate} UpdateTable={this.getUrls.bind(this)} isCreateAction={this.state.isCreateAction} editItem={this.state.editItem} GoBackToCreate = {this.GoBackToCreate.bind(this)} />                
                <ShortLinkTable urls={this.state.urls} UpdateTable={this.getUrls.bind(this)} GoToEdit={this.GoToEdit.bind(this)} />              
            </div>
          );
    }

    componentDidMount(){
       this.getUrls();
    }

    // this func is called also by the children to update the table, see UpdateTable props
    getUrls(){
        UrlShortenerService.api.get()
        .then(res => {
            this.setState({
                urls : res.data
            })
        })
        .catch(err => console.log(err));
    }

    // called by table child to Update parent state and Form component
    GoToEdit = (item) => {
        this.setState({
            isCreateAction : false,
            editItem : item
        }, () => this.formToUpdate.current.ChangeStateToEdit())
    }

    // called by Form child to Update parent state to come back in a create action and update his form.
    GoBackToCreate(){
        this.setState({
            isCreateAction : true,
            editItem : {}
        })
    }
}


export default Home;