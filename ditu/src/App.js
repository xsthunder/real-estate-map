import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const log = console.log;

class App extends Component {
	componentDidMount(){
		log('did mount');
		const BMap = window.BMap
		var map = new BMap.Map("map");
		// 创建地图实例  
		var point = new BMap.Point(116.404, 39.915);
		// 创建点坐标  
		map.centerAndZoom(point, 15);
	}
  render() {
    return (
				<div id='map' className='map'></div>
		);
      //<div className="App">
      //  <header className="App-header">
      //    <img src={logo} className="App-logo" alt="logo" />
      //    <h1 className="App-title">Welcome to React</h1>
      //  </header>
      //  <p className="App-intro">
      //    To get started, edit <code>src/App.js</code> and save to reload.
      //  </p>
      //</div>
  }
}

export default App;
