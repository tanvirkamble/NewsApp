import React, { Component } from 'react';
import NewsItem from './NewsItem';

export default class NewsComponent extends Component {
  articles = [
    {
      id: 1,
      source: { id: 'espn-cric-info', name: 'ESPN Cric Info' },
      author: null,
      title:
        'PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com',
      description:
        'Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com',
      url: 'http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket',
      urlToImage:
        'https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg',
      publishedAt: '2020-04-27T11:41:47Z',
      content:
        "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    },
    {
      id: 2,
      source: { id: 'espn-cric-info', name: 'ESPN Cric Info' },
      author: null,
      title:
        'What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com',
      description:
        'Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com',
      url: 'http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again',
      urlToImage:
        'https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg',
      publishedAt: '2020-03-30T15:26:05Z',
      content:
        'Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]',
    },
    {
      id: 3,
      source: { id: 'espn-cric-info', name: 'ESPN Cric Info' },
      author: null,
      title:
        'PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com',
      description:
        'Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com',

      url: 'http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket',

      urlToImage:
        'https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg',
      publishedAt: '2020-04-27T11:41:47Z',
      content:
        "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    },
    {
      id: 4,
      source: { id: 'espn-cric-info', name: 'ESPN Cric Info' },
      author: null,
      title:
        'What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com',
      description:
        'Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com',
      url: 'http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again',
      urlToImage:
        'https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg',
      publishedAt: '2020-03-30T15:26:05Z',
      content:
        'Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]',
    },
  ];
  constructor() {
    super();
    console.log('hello i am a constuctor from news component');
    this.state = {
      articles: this.articles,
      loading: false,
    };
  }

  async componentDidMount() {
    console.log('cdm');
    let url =
      'https://newsapi.org/v2/top-headlines?country=in&apiKey=14575940aef442f9bd66f8959ac14dd7';
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles });
  }

  render() {
    return (
      <div>
        {console.log('render')}
        <div className="container my-3">
          <h2>MonkeyNews - top headlines</h2>
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
                    imgUrl={
                      !e.urlToImage
                        ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSstxSvgVZ-b4WUi4NvSRvwp4E2LTN7wOfvog&usqp=CAU'
                        : e.urlToImage
                    }
                    altText={e.title || 'Default Image Alt Text'}
                    newsUrl={e.url}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
