import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import defaultImg from './img/logo512.png';
import Loading from './Loading';
import ERROR from './errorMsg';

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
      articles: [],
      loading: false,
      page: 1,
      totalArticlesByCategory: {
        business: 0,
        sports: 0,
        technology: 0,
        entertainment: 0,
        science: 0,
        health: 0,
      },
      totalResults: 0,
      apiError: false,
    };
  }
  UpdateNews = async (page_NO) => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.COUNTRY}&category=${this.props.CATEGORY}&apiKey=14575940aef442f9bd66f8959ac14dd7&page=${this.state.page}&pageSize=${this.props.pageSize}
`;
    try {
      this.setState({ loading: true });

      let data = await fetch(url);
      let parsedData = await data.json();

      if (parsedData.status === 'error' && parsedData.code === 'rateLimited') {
        // Handle rate-limiting error
        this.setState({
          apiError: true,
          errorMessage: 'API rate limit exceeded. Please try again later.',
        });
      } else {
        console.log(parsedData);

        this.setState((prevState) => ({
          articles: this.state.articles.concat(parsedData.articles),
          totalArticles: parsedData.totalResults,
          loading: false,
          totalArticlesByCategory: {
            ...prevState.totalArticlesByCategory,
            [this.props.CATEGORY]: parsedData.totalResults,
          },
        }));
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      this.setState({ apiError: true });
    }
  };
  async componentDidMount() {
    console.log('cdm');
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.COUNTRY}&category=${this.props.CATEGORY}&apiKey=14575940aef442f9bd66f8959ac14dd7&page=${this.state.page}&pageSize=${this.props.pageSize}
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
  }
  fetchMoreData = () => {
    this.setState({ page: this.state.page + 1 });
    this.UpdateNews();
  };

  render() {
    if (this.state.apiError) {
      console.log('Error occurred. Rendering ERROR component');

      return <ERROR />;
    }
    return (
      <div>
        {console.log('render')}
        <h2 className="text-center" style={{ margin: '40px 0px' }}>
          MonkeyNews - top headlines {this.props.CATEGORY}
        </h2>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading && <Loading />}>
          <div className="container my-3">
            <div className="row">
              {this.state.articles.map((e) => {
                return (
                  <div className="col-md-4" key={e.id}>
                    <NewsItem
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
        </InfiniteScroll>
      </div>
    );
  }
}
