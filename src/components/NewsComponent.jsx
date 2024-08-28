import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import defaultImg from './img/logo512.png';
import Loading from './Loading';
import ERROR from './errorMsg';

const NewsComponent = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [apiError, setApiError] = useState(false);
  const [totalArticlesByCategory, setTotalArticlesByCategory] = useState({
    business: 0,
    sports: 0,
    technology: 0,
    entertainment: 0,
    science: 0,
    health: 0,
  });

  const UpdateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.COUNTRY}&category=${props.CATEGORY}&apiKey=${props.RequiredApi}&page=${page}&pageSize=${props.pageSize}
`;
    try {
      setLoading(true);

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

        setArticles((prevArticles) => [
          ...prevArticles,
          ...parsedData.articles,
        ]);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        setTotalArticlesByCategory({
          ...totalArticlesByCategory,
          [props.CATEGORY]: parsedData.totalResults,
        });
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setApiError(true);
    }
  };

  useEffect(() => {
    UpdateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchMoreData = () => {
    setPage(page + 1);
    UpdateNews();
  };

  if (apiError === true) {
    console.log('Error occurred. Rendering ERROR component');

    return <ERROR />;
  }
  return (
    <div>
      <h2
        className="text-center"
        style={{ margin: '40px 0px', marginTop: '90px' }}>
        MonkeyNews - top {props.CATEGORY} headlines
      </h2>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={loading && <Loading />}>
        <div className="container my-3">
          <div className="row">
            {articles.map((e, index) => {
              return (
                <div className="col-md-4" key={e.id || index}>
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
                    key={e.id || index}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

NewsComponent.defaultProps = {
  COUNTRY: 'in',
  pageSize: 9,
  CATEGORY: '',
};
NewsComponent.propTypes = {
  COUNTRY: PropTypes.string,
  pageSize: PropTypes.number,
  CATEGORY: PropTypes.string,
};

export default NewsComponent;
