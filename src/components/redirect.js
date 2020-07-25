import React from 'react';
import UrlShortenerService from '../requestsHandler/urlShortenerService.js';
import {NotFound, GenericError} from './Errors/erorrs'

class Redirect extends React.Component {

    state = {
      error : null
    }

    componentDidMount(){     
        const params = this.props.match.params;

        UrlShortenerService.api.redirect(params.shortLink)
        .then(res => {
          window.location.href = res.data;
        })
        .catch(err => {
          console.log(err.response)
          this.setState({
            error : err.response.status
          })
        })
    }
  render (){
    return (  
            <div>
                {this.state.error ? (this.state.error === 404 ? <NotFound /> : <GenericError />) : <h1>Redirecting...</h1>}
            </div>
          )
  }
}

export default Redirect;