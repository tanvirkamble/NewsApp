import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import defaultImg from '../img/logo512.png';
import Loading from './Loading';
import ERROR from './ErrorMsg';

const NewsComponent = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [apiError, setApiError] = useState(null);
  const [totalArticlesByCategory, setTotalArticlesByCategory] = useState({
    business: 0,
    sports: 0,
    technology: 0,
    entertainment: 0,
    science: 0,
    health: 0,
  });

  const apiToken = 'yrtwkgXKPwHQdtYcZhPv1Cr0H1Y3wcnCbEp3psN1';
  const categories = 'business,sports,technology,entertainment,science,health';

  const UpdateNews = async () => {
    let url = `https://api.thenewsapi.com/v1/news/all?api_token=${apiToken}&categories=${
      props.CATEGORY || categories
    }&page=${page}&limit=${props.pageSize}&language=en`;
    console.log('Fetching URL:', url); // Log the URL being fetched
    try {
      setLoading(true);
      let response = await fetch(url);
      console.log('API Response:', response); // Log the response object

      if (!response.ok) {
        console.log('API Error Status:', response.status); // Log the status code

        // Check for HTTP errors
        if (response.status === 429) {
          setApiError('Rate limit exceeded. Please try again later.');
        } else if (response.status === 404) {
          setApiError('Resource not found.');
        } else if (response.status === 403) {
          setApiError('Access forbidden. Check your API plan.');
        } else if (response.status === 402) {
          setApiError('Payment required. Upgrade your API plan.');
        } else if (response.status === 401) {
          setApiError('Invalid API token.');
        } else {
          setApiError('An unknown error occurred.');
        }
        setLoading(false); // Ensure loading is set to fals
      }

      let parsedData = await response.json();
      console.log('Parsed Data:', parsedData); // Log the parsed data
      setLoading(false); // Ensure loading is set to false

      if (parsedData.error) {
        setApiError(
          parsedData.error.message || 'An error occurred while fetching news.'
        );
        return;
      }

      if (Array.isArray(parsedData.data)) {
        setArticles((prevArticles) => [...prevArticles, ...parsedData.data]);
        setTotalResults(parsedData.meta.found);
        setTotalArticlesByCategory({
          ...totalArticlesByCategory,
          [props.CATEGORY]: parsedData.meta.found,
        });
      } else {
        setApiError('Unexpected data format received.');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setApiError('Error fetching news.');
      setLoading(false); // Ensure loading is set to false
    }
  };

  useEffect(() => {
    console.log('Updating news...');
    const fetchData = async () => {
      setApiError(null); // Clear previous errors
      await UpdateNews();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchMoreData = () => {
    setPage(page + 1);
    UpdateNews();
  };

  if (apiError) {
    return <ERROR message={apiError} />;
  }

  return (
    <>
      <div className="alert alert-primary" role="alert">
        The api used here has a limited(very less) number of request
        available,and the reason to use this api is it being both free and
        deployable.
      </div>
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
            {articles.map((e, index) => (
              <div className="col-md-4" key={e.source_id || index}>
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
                  imgUrl={!e.image_url ? defaultImg : e.image_url}
                  altText={e.title || 'Default Image Alt Text'}
                  newsUrl={e.url}
                  author={e.author}
                  date={e.published_at}
                  source={e.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
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
