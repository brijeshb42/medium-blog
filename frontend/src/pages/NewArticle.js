import {h, Component} from 'preact'
import { connect } from 'preact-redux';
import Title from 'react-document-title';
import TextArea from 'react-textarea-autosize';

import { Keys } from '../constants';
import QuillComponent from '../components/Quill';

import {
  startLoadingArticle,
  articleChangeTitle,
  articleChangeSummary,
  articleChangeContent,
  articleReset,
} from '../store/article';

import './new-article.scss';

export class NewArticle extends Component {
  static defaultProps = {
    articleID: "-1",
  };

  componentDidMount() {
    setTimeout(() => this.titleInput.focus(), 0);
    const articleID = Number.parseInt(this.props.articleID);
    if (typeof articleID !== 'number' || articleID === -1) {
      return;
    }
    this.props.startLoadingArticle(articleID);
  }

  componentWillUnmount() {
    this.props.articleReset();
  }

  handleKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) {
      return;
    }
    const { article: { article: { title, summary } } } = this.props;
    if (e.target === this.titleInput) {
      switch(e.which) {
        case Keys.DOWN:
          e.preventDefault();
          this.summaryInput.focus();
          break;
        case Keys.ENTER:
        case Keys.RIGHT:
          if (this.titleInput.selectionEnd === this.titleInput.selectionStart && this.titleInput.selectionStart === title.length) {
            e.preventDefault();
            this.summaryInput.focus();
          }
          break;
        default:
          break;
      }
    } else if (e.target === this.summaryInput.base) {
      switch(e.which) {
        case Keys.UP:
          e.preventDefault();
          this.titleInput.focus();
          break;
        case Keys.DOWN:
          e.preventDefault();
          this.quill.focus();
          break;
        case Keys.ENTER:
        case Keys.RIGHT:
          if (this.summaryInput.selectionEnd === this.summaryInput.selectionStart && this.summaryInput.selectionStart === summary.length) {
            e.preventDefault();
            this.quill.focus();
          }
          break;
        case Keys.BACKSPACE:
          if (summary.length === 0) {
            e.preventDefault();
            this.titleInput.focus();
          }
          break;
        case Keys.LEFT:
          if (this.summaryInput.selectionStart === 0) {
            e.preventDefault();
            this.titleInput.focus();
          }
          break;
        default:
          break;
      }
    }
  };

  onQuillBackSpace = (e) => {
    this.summaryInput.focus();
  };

  render({ article: { loading, loaded, article }, articleID }) {
    return (
      <Title title={article.title || 'New Article'}>
        <div className="md-article-editor">
          <div className="md-title-container">
            <label
              htmlFor="article-title"
              style={{ opacity: article.title.length === 0 ? 0 : 1 }}
            >Title</label>
            <input
              id="article-title"
              type="text"
              placeholder="Title"
              className="md-article-title"
              value={article.title}
              ref={e => this.titleInput = e}
              onKeyDown={this.handleKeyDown}
              onInput={(e) => {
                this.props.articleChangeTitle(e.target.value);
              }} />
          </div>
          <div className="md-summary-container">
            <label
              style={{ opacity: article.summary.length === 0 ? 0 : 1 }}
              htmlFor="article-summary"
            >Summary</label>
            <TextArea
              id="article-summary"
              placeholder="Summary"
              className="md-article-summary"
              value={article.summary}
              ref={e => this.summaryInput = e}
              onKeyDown={this.handleKeyDown}
              onInput={(e) => {
                this.props.articleChangeSummary(e.target.value);
              }} />
          </div>
          <QuillComponent
            ref={e => {
              this.quill = e;
            }}
            value={article.content}
            onChange={this.props.articleChangeContent}
            onBackSpace={this.onQuillBackSpace}
          />
        </div>
      </Title>
    );
  }
};

const mapStateToProps = ({ article }, ownProps) => {
  return {
    article,
  };
};
const mapDispatchToProps = (dispatch) => ({
  startLoadingArticle: (id) => dispatch(startLoadingArticle(id)),
  articleChangeTitle: (title) => dispatch(articleChangeTitle(title)),
  articleChangeSummary: (summary) => dispatch(articleChangeSummary(summary)),
  articleChangeContent: (content) => dispatch(articleChangeContent(content)),
  articleReset: () => dispatch(articleReset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewArticle)
