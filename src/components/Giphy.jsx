/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom Imports  ----------*/
import history from '../services/history';

import GphApiClient from 'giphy-js-sdk-core';
var client = GphApiClient("PDMxypcw5ivDQhpO9jtsaeRddf9siLxA");

//var searchImage = function(){
    var image = "";
    client.search('gifs', {"q": "cats", "limit": 1})
        .then((response) => {
            response.data.forEach((gifObject) => {
                console.log(gifObject);
                image = gifObject.images.downsized.gif_url;
                console.log(image);
            })
        })
        .catch((err) => {

        });
    //return image;
//}

/*=========================================
 =          Giphy image Component         =
 =========================================*/

class Giphy extends Component {

    constructor(props) {

        super(props);
        this.state = {
            //client: GphApiClient("PDMxypcw5ivDQhpO9jtsaeRddf9siLxA"),
            q: '',
            s: '',
            ids: '',
            limit: '',
            offset: '',
            rating: '',
            lang: '',
            fmt: '',
            sort: '',
            tag: '',
        };

        //this.searchImage = this.searchImage().bind(this);
    }



    /*searchImage(){
        var image = "";
        this.client.search('gifs', {"q": "cats", "limit": 1})
            .then((response) => {
                response.data.forEach((gifObject) => {
                    console.log(gifObject);
                    image = gifObject.images.original.gif_url;
                })
            })
            .catch((err) => {

            });
        return image;
    }*/

    render() {
        return (
            <img src={ image } />
            //<img src={ image } />
        );
    }
}

export default Giphy;