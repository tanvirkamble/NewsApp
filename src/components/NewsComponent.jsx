import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NewsItem from './NewsItem';
import defaultImg from './img/logo512.png';
import Loading from './Loading';

export default class NewsComponent extends Component {
  static defaultProps = {
    COUNTRY: 'in',
    pageSize: 9,
    CATEGORY: '',
  };
  static propTypes = {
    COUNTRY: PropTypes.string,
    pageSize: PropTypes.number,
    CATEGORY: PropTypes.string,
  };

  constructor() {
    super();
    console.log('hello i am a constuctor from news component');
    this.state = {
      //   articles: this.articles,
      articles: [],
      loading: false,
      page: 1, // Initialize the page property
    };
  }
  UpdateNews = async (page_NO) => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.COUNTRY}&category=${this.props.CATEGORY}&apiKey=868871d32bf143f3ad4b3839a337fd14&page=${this.state.page}&pageSize=${this.props.pageSize}
`;
    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  };
  async componentDidMount() {
    console.log('cdm');
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.COUNTRY}&category=${this.props.CATEGORY}&apiKey=868871d32bf143f3ad4b3839a337fd14&page=${this.state.page}&pageSize=${this.props.pageSize}
`;
    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
    //no need of this set of func as for limitations of articles pageSize exists
    // Slice the array to limit the number of articles to 15
    // const limitedArticles = parsedData.articles.slice(
    //   0,
    //   parsedData.totalResults > 15 ? 15 : parsedData.totalResults
    // );
    // this.setState({ articles: limitedArticles });
  }

  handlePrevbtn = async () => {
    //     console.log('prev btn');
    //     let url = `https://newsapi.org/v2/top-headlines?country=${
    //       this.props.COUNTRY
    //     }&category=${
    //       this.props.CATEGORY
    //     }&apiKey=868871d32bf143f3ad4b3839a337fd14&page=${
    //       this.state.page - 1
    //     }&pageSize=${this.props.pageSize}
    // `;
    //     this.setState({ loading: true });
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     console.log(parsedData);
    //     this.setState({ articles: parsedData.articles });
    //     this.setState({
    //       page: this.state.page - 1,
    //       articles: parsedData.articles,
    //       loading: false,
    //     });
    this.setState({ page: this.state.page - 1 });
    this.UpdateNews();
  };
  handleNextbtn = async () => {
    console.log('next btn');

    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 9))) {
    //   console.log(this.state.page);
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.COUNTRY
    //   }&category=${
    //     this.props.CATEGORY
    //   }&apiKey=868871d32bf143f3ad4b3839a337fd14&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({ articles: parsedData.articles });
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }

    this.setState({ page: this.state.page + 1 });
    this.UpdateNews();
  };
  render() {
    return (
      <div>
        {console.log('render')}
        <div className="container my-3">
          <h2 className="text-center" style={{ margin: '40px 0px' }}>
            MonkeyNews - top headlines {this.props.CATEGORY}
          </h2>
          {this.state.loading && <Loading />}
          <div className="row">
            {this.state.articles.map((e) => {
              return (
                <div className="col-md-4" key={e.id}>
                  <NewsItem
                    // title={e.title ? {
                    //   e.title.length > 45
                    //     ? e.title.slice(0, 45) + '...'
                    //     : e.title
                    // } : ''}
                    // description={
                    //   e.description.length > 88
                    //     ? e.description.slice(0, 88) + '...'
                    //     : e.description
                    // }
                    title={
                      e.title
                        ? e.title.length > 45
                          ? e.title.slice(0, 45) + '...'
                          : e.title
                        : 'No title'
                    }
                    description={
                      e.description
                        ? e.description.length > 88
                          ? e.description.slice(0, 88) + '...'
                          : e.description
                        : 'No description'
                    }
                    // imgUrl={e.urlToImage ? e.urlToImage : '/public/logo512.png'}
                    imgUrl={!e.urlToImage ? defaultImg : e.urlToImage}
                    altText={e.title || 'Default Image Alt Text'}
                    newsUrl={e.url}
                    author={e.author}
                    date={e.publishedAt}
                    source={e.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="container d-flex justify-content-between"
          style={{ marginBottom: '2.5%' }}>
          <button
            className="btn btn-dark"
            onClick={this.handlePrevbtn}
            disabled={this.state.page <= 1}>
            &larr; prev
          </button>
          <p
            style={{
              border: '3px solid black',
              padding: '4px 8px',
              marginTop: '2.5%',
            }}>
            {this.state.page} OutOf{' '}
            {Math.ceil(this.state.totalArticles / this.props.pageSize)}
          </p>
          <button
            disabled={
              this.state.page > this.state.totalArticles / this.props.pageSize
            }
            className="btn btn-dark"
            onClick={this.handleNextbtn}>
            next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
