import React from 'react';
import './table.css'
import UrlShortenerService from '../../requestsHandler/urlShortenerService';

export default class shortLinkTable extends React.Component{
    state = {
        message : ''
    }
    render(){
        return (
            <div>
            <table id="urlsTable">
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

    renderTableElements(){
        return this.props.urls.length > 0 ?
        this.props.urls.map((item, index) =>
            <tr key={item.id}>
                <td>{index +1}</td>
                <td><a href={item.url} target="_blanck">{item.shortLink}</a></td>
                <td><button onClick={() => this.deleteUrl(item.id)}>Delete</button> - <button onClick={() => { this.props.GoToEdit(item)}}>Edit</button></td>
            </tr>
            )
         : 
         <tr>
             <td>/</td>
             <td>List empty</td>
             <td>/</td>
         </tr>
    }

    deleteUrl(id){
        UrlShortenerService.api.delete(id)
        .then(res => {
            this.setState({
            message : <p style= {{color : 'green'}}>{res.data}</p>
            }, () => {
                    this.props.UpdateTable();
                })

            setTimeout(() => {this.setState({message : ''})}, 3000)
        })
        .catch(err =>{
            console.log(err)
            this.setState({
                message : <p style= {{color : 'red'}}>Error during delete</p>
            })
        }) 
    }
}

