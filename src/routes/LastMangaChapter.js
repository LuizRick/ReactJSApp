import React, { Component } from 'react'
import { Button, Icon } from '@material-ui/core';
import Slider from "react-slick";

export default class LastMangaChapter extends Component {

  constructor() {
    super();
    this.spaceWidth = Math.round(window.innerWidth * 0.3);
    this.spaceHeight = Math.round(window.innerHeight * 0.1);
    this.images = JSON.parse(localStorage.getItem("lastchapter")).images;
    this.slideSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }

  requestFullScreen() {
      document.documentElement.requestFullscreen();
  }

  render() {
    console.log(this.images)
    return (
      <div>
        <div className="fullscreenbtn">
          <Button color="primary" onClick={this.requestFullScreen.bind(this)}>
            FullScreen
                <Icon color="primary">fullscreen</Icon>
          </Button>
        </div>
        <Slider {...this.slideSettings}>
          {this.images.map((value, index) => {
              return (
                <div key={index}>
                  <img src={value} 
                    width={window.innerWidth - this.spaceWidth} height={window.innerHeight + this.spaceHeight}
                    style={{ margin: "auto"}}/>
                </div>
              )
            })}
        </Slider>
      </div>
    )
  }
}
