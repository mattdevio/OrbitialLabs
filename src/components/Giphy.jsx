/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom Imports  ----------*/
import history from '../services/history';

import GphApiClient from 'giphy-js-sdk-core';
var client = GphApiClient("PDMxypcw5ivDQhpO9jtsaeRddf9siLxA");

//var searchImage = function(){
    var imge = "";
    client.search('gifs', {"q": "cats", "limit": 1})
        .then((response) => {
            response.data.forEach((gifObject) => {
                console.log(gifObject);
                imge = gifObject.images.downsized.gif_url;
                console.log(imge);
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
            //<p>{imge}</p>
            <img src={ imge } />

        );
    }
}

export default Giphy;