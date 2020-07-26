import React from 'react';
import './table.css'
import UrlShortenerService from '../../requestsHandler/urlShortenerService';

export default class shortLinkTable extends React.Component{
    state = {
        message : ''
    }
   
    renderTableElements(){
        if(this.props.urls.length > 0){
            return  this.props.urls.map((item, index) =>
            <tr key={item.id} data-testid="item">
                <td>{index +1}</td>
                <td><a aria-label={"item" + (index+1)} href={item.url} target="_blanck">{item.shortLink}</a></td>
                <td><button aria-label={"btnDelete" + (index+1)} onClick={() => this.deleteUrl(item.id)}>Delete</button> - <button onClick={() => { this.props.GoToEdit(item)}}>Edit</button></td>
            </tr>
            )
        }else{
            return (
            <tr>
                <td>/</td>
                <td>List empty</td>
                <td>/</td>
            </tr>
            )
        }
    }

    deleteUrl(id){
        UrlShortenerService.api.delete(id)
        .then(res => {
            this.setState({
            message : <p data-testid="deleteSuccess" style= {{color : 'green'}}>{res.data}</p>
            }, () => {
                    this.props.UpdateTable();
                })

            setTimeout(() => {this.setState({message : ''})}, 3000)
        })
        .catch(err =>{
            console.log(err)
            this.setState({
                message : <p aria-label="err" style= {{color : 'red'}}>Error during delete</p>
            })
        }) 
    }

    render(){
        return (
            <div>
            <table id="urlsTable" data-testid="table">
                <thead>
                    <tr>
                        <th>#</th> 
                        <th>My Short link</th>   
                        <th>Actions</th> 
                    </tr>           
                </thead>
                <tbody>
                {this.renderTableElements()}
                </tbody>
            </table>

            {this.state.message}

            </div>
        )
    }
}

