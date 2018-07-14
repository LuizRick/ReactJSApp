import React, { Component } from 'react'

export default class LastMangaChapter extends Component {
  render() {
    let images = JSON.parse(localStorage.getItem("lastchapter")).images;
    console.log(images);
    return (
      <div>
        {images.map((value , index) => {
            return(
                <div key={index}>
                    <img src={value} />
                </div>
            )
        })}
      </div>
    )
  }
}
