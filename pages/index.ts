import React from 'react';
import Link from 'next/link';
import Head from '../components/head';
import 'isomorphic-unfetch';
import EmbedCode from '../components/EmbedCode';

export interface VimrcItem {
  index: number;
  name: string;
  code: string;
}

export default class Home extends React.Component {
  static async getInitialProps() {
    const url: string =
      'https://api.github.com/search/repositories?q=dotfiles+in:vimrc';
    const { items } = await fetch(url).then(res => res.json<T>());
    let vimrcList: Array<VimrcItem> = [];

    for (let i = 0, len = items.length; i < len; i++) {
      const vimrcUrl: string = `${items[i].html_url}/blob/master/.vimrc`;
      vimrcList.push({
        index: i,
        name: items[i].full_name,
        code: `https://gist-it.appspot.com/${vimrcUrl}`
      });
    }

    return { vimrcList };
  }

  render() {
    const { vimrcList } = this.props;

    return (
      <div>
        <Head title="vimrc collection" />
        <div>
          <h1>vimrc collection</h1>
          <div>
            <EmbedCode vimrcList={vimrcList} />
          </div>
        </div>
      </div>
    );
  }
}
