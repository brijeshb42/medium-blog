import {h, Component} from 'preact';
import Quill from 'quill';
import Delta from 'quill-delta';

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';

window.Quill = Quill;

const Keyboard = Quill.import('modules/keyboard');

export default class QuillComponent extends Component {

  static defaultProps = {
    onChange: (data) => {},
    placeholder: 'Go crazy with your thoughts...',
    value: {},
  };

  constructor(props) {
    super(props);
    this._editor = null;
    this._updated = false;
  }

  componentDidMount() {
    const quill = new Quill(this._editor, {
      theme: 'bubble',
      placeholder: this.props.placeholder,
    });
    quill.on('text-change', (delta) => {
      this._updated = true;
      this.props.onChange(quill.getContents());
    });
    if (this.props.onSelectionChange) {
      quill.on('selection-change', function() {
        this.props.onSelectionChange.apply(this, arguments);
      });
    }
    // quill.keyboard.addBinding({ key: Keyboard.keys.BACKSPACE }, this.unfocus);
    // quill.keyboard.addBinding({
    //   key: Keyboard.keys.UP
    // }, {
    //   collapsed: true
    // }, this.unfocus);
    this.quill = quill;
    this.quill.setContents(new Delta(this.props.value));
  }

  componentWillReceiveProps(newProps) {    
    if (!this._updated) {
      const oldDelta = this.quill.getContents();
      const newDelta = new Delta(newProps.value);
      const diff = oldDelta.diff(newDelta);

      if (diff.ops.length > 0) {
        console.log('cWRPs');
        this.quill.updateContents(diff);
      }
    }
    if (this._updated) this._updated = false;
  }

  componentWillUnmount() {
    this.quill.scroll.observer.disconnect();
    this.quill = null;
  }

  shouldComponentUpdate(p, s) {
    return p.value !== this.props.value;
  }

  focus = () => {
    setTimeout(() => this.quill.focus(), 0);
  };

  unfocus = (range, ctx) => {
    console.log(range, ctx);
    if (range.index === 0 && range.length === 0) {
      this.props.onBackSpace();
      return true;
    }
    return false;
  };

  render() {
    return (
      <div class="md-quill-container">
        <div ref={e => {
          if (this._editor === null) {
            this._editor = e;
          }
        }} />
      </div>
    );
  }
}
