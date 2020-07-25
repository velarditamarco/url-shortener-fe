import axios from 'axios';
import config from './config.js';

const controller = 'api/UrlShortener/';
const url = config.url + controller;

export default {
    api : {
        get(){
            return axios.get(url);
        },
        getBy(shortLink){
            return axios.get(url);
        },
        create(model){
            return axios.post(url, model);
        },
        edit(id, model){
            return axios.put(url + id, model);
        },
        delete(id){
            return axios.delete(url + id);
        },
        redirect(shortLink){
            return axios.get(url + shortLink)
        }
    }
}