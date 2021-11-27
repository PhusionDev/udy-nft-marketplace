import React, { Component } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBird from "../abis/KryptoBird.json";

class App extends Component {
  async componentDidMount() {
    await this.loadWeb3();
  }

  // first up is to detect ethereum provider
  async loadWeb3() {
    const provider = await detectEthereumProvider();

    // modern browsers
    // if there's a provider then lets
    // log that it's working and access the window from the doc
    // to set web3 to the provider
    if (provider) {
      console.log("ethereum wallet is connected");
      window.ethereum = new Web3(provider);
    } else {
      // no ethereum provider
      console.log("no ethereum wallet detected");
    }
  }
  render() {
    return (
      <div>
        <h1>NFT Marketplace</h1>
      </div>
    );
  }
}

export default App;
