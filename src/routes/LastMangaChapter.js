import React, { Component } from 'react'
import { Button, Icon } from '@material-ui/core';
import Slider from "react-slick";

export default class LastMangaChapter extends Component {

  constructor(props) {
    super(props);
    this.spaceWidth = Math.round(window.innerWidth * 0.3);
    this.spaceHeight = Math.round(window.innerHeight * 0.1);
    this.images = JSON.parse(localStorage.getItem("lastchapter")).images;
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.slideSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    this.state = {
      isFullScreen:false
    }
    document.addEventListener('fullscreenchange', this.fullScreenChangeEvent.bind(this));
  }

  toggleFullScreen(){
    if(this.state.isFullScreen){
      document.exitFullscreen();
    }else{
      document.documentElement.requestFullscreen();
    }
  }

  fullScreenChangeEvent(e){
    if(document.fullscreenElement){
      this.setState({isFullScreen:true})
    }else{
      this.setState({isFullScreen:false})
    }
  }

  render() {
    return (
      <div>
        <div className="fullscreenbtn">
          <Button color="primary" onClick={this.toggleFullScreen}>
            FullScreen
                <Icon color="primary">fullscreen</Icon>
          </Button>
        </div>
        <div onDoubleClick={this.toggleFullScreen}>
          <Slider {...this.slideSettings}>
            {this.images.map((value, index) => {
              return (
                <div key={index}>
                  <img src={value} alt={`${index}`}
                    width={window.innerWidth - this.spaceWidth} height={window.innerHeight + this.spaceHeight}
                    style={{ margin: "auto" }} />
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
    )
  }
}
