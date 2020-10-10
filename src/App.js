import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

// eslint-disable-next-line

class App extends Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: "",
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault(); //我們不想要有預設的 form submission,

    const accounts = await web3.eth.getAccounts(); //找到我們當前的 Account

    this.setState({ message: "Waiting on transaction success..." });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"), // 此處 Event 輸入的值，就是我們下面設置 Input 展示的、要輸入進去的值
    });

    this.setState({ message: "You have been on-chained!" });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success....." });

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    this.setState({ message: "A winner has been picked!" });
  };

  //web3.eth.requestAccounts().then(console.log);
  //web3.eth.getAccounts().then(console.log());
  //console.log(web3.version); //展示 Web3版本

  render() {
    return (
      <div>
        <h1>Lottery Contract</h1>
        <p>
          This contract is managed by <b>{this.state.manager}</b>.<br></br>
          There are currently {this.state.players.length} people entered,
          competing to win {web3.utils.fromWei(this.state.balance, "ether")}{" "}
          ether!
        </p>

        <hr></hr>

        <form onSubmit={this.onSubmit}>
          <h4> H4 Title here, try it! </h4>
          <div>
            <label>Amount of ether to enter</label>
            <br></br>
            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />

        <h4> Ready to pick a winner?</h4>
        <button onClick={this.onClick}> Pick a Winner! </button>
        <hr />

        <h1> {this.state.message}</h1>
      </div>
    );
  }
}
export default App;
