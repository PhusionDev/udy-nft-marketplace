import React, { Component } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBird from "../abis/KryptoBird.json";

class App extends Component {
    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    // first up is to detect ethereum provider
    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            console.log(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3;
        const acc = await web3.eth.getAccounts();
        this.setState({ account: acc[0] });

        const networkId = await web3.eth.net.getId();
        const networkData = KryptoBird.networks[networkId];
        if (networkData) {
            const abi = KryptoBird.abi;
            const address = networkData.address;
            const contract = new web3.eth.Contract(abi, address);
            this.setState({ contract });
            console.log(this.state.contract);

            const totalSupply = await contract.methods.totalSupply().call();
            this.setState({ totalSupply });
            console.log(this.state.totalSupply);

            for (let i = 0; i < totalSupply; i++) {
                const kb = await contract.methods.kryptoBirdz(i).call();
                this.setState({
                    kryptoBirdz: [...this.state.kryptoBirdz, kb],
                });
            }
            console.log(this.state.kryptoBirdz);
        } else {
            window.alert("Smart contract not deployed");
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            account: "",
            contract: null,
            totalSupply: 0,
            kryptoBirdz: [],
        };
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <div
                        className="navbar-brand col-sm-3 col-md-3 mr-0"
                        style={{ color: "white" }}
                    >
                        KryptoBirdz NFTs (Non Fungible Tokens)
                    </div>
                    <ul className="navbar-nav px-3">
                        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                            <small className="text-white">
                                {this.state.account}
                            </small>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default App;
