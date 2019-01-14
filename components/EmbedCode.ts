import React from 'react';
import { VimrcItem as Props } from '../pages';

export interface State {
  selectedItem: Object;
  loading: boolean;
}

export default class EmbedCode extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedItem: {},
      loading: false
    };
    this.showCodeInitilize = this.showCodeInitilize.bind(this);
    this.handleShowCodeButton = this.handleShowCodeButton.bind(this);
    this.handleCloseCodeButton = this.handleCloseCodeButton.bind(this);
  }

  showCodeInitilize() {
    this.setState({ selectedItem: {} });
  }

  handleShowCodeButton(item: Props) {
    this.setState({ loading: true });

    const { selectedItem } = this.state;
    const { vimrcList } = this.props;

    if (selectedItem && selectedItem.id !== item.id) this.showCodeInitilize();

    this.setState({ selectedItem: item, loading: false });
  }

  handleCloseCodeButton() {
    this.showCodeInitilize();
  }

  componentDidMount() {
    this.showCodeInitilize();
  }

  render() {
    const { vimrcList } = this.props;
    const { selectedItem, loading } = this.state;

    if (!vimrcList || loading) 'loading...';

    return (
      <div>
        <p>選択中のvimrc : {selectedItem.name}</p>
        {vimrcList.map(item => (
          <div key={item.index}>
            <p>{item.name}</p>
            {+selectedItem.index === +item.index ? (
              <div>
                <div>
                  表示されない場合もあります。
                  <script src={item.code} />
                </div>
                <div>
                  <button onClick={() => this.handleCloseCodeButton(item)}>
                    close
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <button onClick={() => this.handleShowCodeButton(item)}>
                  open
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}
