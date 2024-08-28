import React from 'react';

export const NewsItem = (props) => {
  let { title, description, imgUrl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card" style={{ width: '18rem' }}>
        <span
          className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
          style={{ left: '90%', zIndex: '1' }}>
          {source}
        </span>
        <img
          src={imgUrl}
          className="card-img-top"
          alt="..."
          height="161.100"
          srcSet={imgUrl}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text muted">
              By {author ? author : 'UNknown author'}
              <br />
              on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={newsUrl}
            onClick={() => console.log(newsUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-primary">
            read more
          </a>
        </div>
      </div>
    </div>
  );
};
export default NewsItem;
