import { h, Component } from 'preact';

/**
 *  <SplitPoint load={require('bundle?lazy!./foo')} fallbackContent={(
 *    <div class="loading" />
 *  )} />
 */
export default class SplitPoint extends Component {
  componentWillMount() {
    let cb = this.linkState('child');
    this.props.load(cb);
  }
  render({ load, fallbackContent, ...props }, { child }) {
    return child ? h(child, props) : fallbackContent || null;
  }
}
