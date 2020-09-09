export const defaultImages = {
  alert: require('../../assets/leafUtils/stream_alert-01.png'),
  investigation: require('../../assets/leafUtils/stream_investigation-01.png'),
  news: require('../../assets/leafUtils/stream_news-02.png'),
  vulnerability: require('../../assets/leafUtils/stream_vulnerability-01.png'),
  'xftas-rss': require('../../assets/leafUtils/stream_xftas_rss-01.png'),
  collection: require('../../assets/leafUtils/stream_collection-01.png'),
  default: require('../../assets/leafUtils/stream_news-02.png')
};

export const priorities = ['high', 'medium', 'low'];
export const leafTypes = ['alert', 'investigation', 'news', 'vulnerability', 'collection', 'xftas-rss'];
export const defaultOption = 'none';

export const getImageUrl = (img, type = 'default') => (img || defaultImages[type] || defaultImages.default);
export const getPriority = (item) => (priorities.indexOf(item) !== -1 ? item : defaultOption);
export const getLeafType = (item) => (leafTypes.indexOf(item) !== -1 ? item : defaultOption);
