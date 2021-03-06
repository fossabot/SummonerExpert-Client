import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import SearchBar from '../components/SearchBar';
import CommonStyles, { desktop } from '../assets/styles/Common';
import RecommendationList from '../components/RecommendationList';
import Tab from '../components/Tab';
import Items from '../static/items';
import Champions from '../static/champions';

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    display: 'flex',
  },
  header: {
    paddingTop: '2rem',
    flex: '0 1 auto',
  },
  listContainer: {
    display: 'flex',
    marginTop: '4rem',
    justifyContent: 'space-between',
  },
  tabContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  tabHeader: {
    display: 'flex',
    paddingTop: '2rem',
  },
  tabContent: {
    flex: 1,
    height: 0,
    overflow: 'auto',
    marginBottom: '1rem',
  },
  recommendationList: {
    width: '32%',
  },
  recommendationTab: {
    width: '100%',
  }
});

const RECOMMENDATIONS = [
  {
    title: 'champions',
    items: Champions.championQueries,
    getItemImage: Champions.getChampionImage,
  },
  {
    title: 'matchups',
    items: Champions.championMatchupQueries,
    getItemImage: Champions.getChampionImage,
  },
  {
    title: 'items',
    items: Items.itemQueries,
    getItemImage: Items.getItemImage,
  },
];

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0,
    }
  }

  handleSelectTab = (index) => {
    this.setState({ selectedTab: index });
  }

  renderTabs = () => {
    const { selectedTab } = this.state;
    const { items, getItemImage } = RECOMMENDATIONS[selectedTab];

    return (
      <div className={css(styles.tabContainer)}>
        <div className={css(styles.tabHeader)}>
          {RECOMMENDATIONS.map((recommendation, index) => {
            const { title } = recommendation;
            return (
              <Tab
                key={`tab-${index}`}
                index={index}
                onClick={this.handleSelectTab}
                title={title}
                selected={selectedTab === index}
              />
            );
          })}
        </div>
        <div className={css(styles.tabContent)}>
          <RecommendationList
            limit={5}
            items={items}
            getItemImage={getItemImage}
          />
        </div>
      </div>
    );
  }

  renderLists = () => {
    return (
      <div className={css(styles.listContainer)}>
        {RECOMMENDATIONS.map((recommendation, index) => (
          <div
            key={`recommendation-${index}`}
            className={css(styles.recommendationList)}
          >
            <RecommendationList limit={5} {...recommendation} />
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div className={css(styles.homePage)}>
        <div className={css(CommonStyles.container)}>
          <div className={css(styles.header)}>
            <SearchBar />
          </div>
          {window.innerWidth >= desktop ? this.renderLists() : this.renderTabs()}
        </div>
      </div>
    );
  }
}

export default Home;
