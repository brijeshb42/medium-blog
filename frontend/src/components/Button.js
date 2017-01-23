import {h, Component} from 'preact';

export default class Button extends Component {
  static defaultProps = {
    disabled: false,
    type: '',
  };

  render (props) {
    let className = '';
    if (props.type) {
      className += props.type;
    }
    return (
      <button {...props} className={className}>{props.children}</button>
    );
  }
}
