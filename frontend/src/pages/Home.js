import {h, Component} from 'preact'
import { connect } from 'preact-redux';
import Title from 'react-document-title';

import Article from '../components/Article';
import Button from '../components/Button';
import { startLoadingArticles } from '../store/home';

import './home.scss';

export class Home extends Component {

  componentDidMount() {
    this.props.startLoadingArticles();
  }

  render({ home: { articles, loading} }) {
    return (
      <Title title={loading ? 'Loading Articles' : 'Articles'}>
        <div>
          {loading ? <p>Loading Articles...</p> : null}
          {articles.map(article => (
            <Article key={article.id} article={article} />
          ))}
        </div>
      </Title>
    );
  }
};


const mapStateToProps = ({ home }, ownProps) => {
  return {
    home,
  };
};
const mapDispatchToProps = (dispatch) => ({
  startLoadingArticles: () => dispatch(startLoadingArticles()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
