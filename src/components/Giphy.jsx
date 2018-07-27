/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom Imports  ----------*/

import GphApiClient from 'giphy-js-sdk-core';
var client = GphApiClient("PDMxypcw5ivDQhpO9jtsaeRddf9siLxA");


//var searchImage = function(){
var imge = "";
    //return image;
//}

/*=========================================
 =          Giphy image Component         =
 =========================================*/

class Giphy extends Component {

    constructor(props){
        super(props);

        client.search('gifs', {"q": props.search, "limit": 1})
            .then((response) => {
                response.data.forEach((gifObject) => {
                    console.log(gifObject);
                    imge = gifObject.images.fixed_width_small.gif_url;
                    console.log(imge);
                })
            })
            .catch((err) => {

            });

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
            //<p>{imge}</p>
            <img src={ imge } />

        );
    }
}

export default Giphy;