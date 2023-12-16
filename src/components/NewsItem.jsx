import React, { Component } from 'react';

export default class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: '18rem' }}>
          <img
            src={imgUrl}
            className="card-img-top"
            alt="..."
            height="161.100"
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a
              href={newsUrl}
              onClick={() => console.log(newsUrl)}
              target="_blank"
              className="btn btn-sm btn-primary">
              read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
