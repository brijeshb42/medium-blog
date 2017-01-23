import { h, Component } from 'preact';

import { Link } from 'preact-router';

export default class Article extends Component {
  render({ article: { id, title, summary } }) {
    return (
      <article className="card md-article">
        <header>
          <Link href={`/article/${id}`}><h3>{title}</h3></Link>
        </header>
        <footer>
          <p>{summary}</p>
        </footer>
      </article>
    );
  }
}
