import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import House from "../House/House";
import Senate from "../Senate/Senate";
import logo from './logo.png';

const main = (
	<div className="App">
		<header className="App-header">
		<img src={logo} alt="logo" />
      <section className="buttons">
						<Link
							to={"/House"}
							className="house-button"
              style={{ color: 'blue', textDecoration: 'inherit', fontSize: '1.4em' }}
						>
							House
						</Link>
						<Link
							to={"/Senate"}
							className="senate-button"
              style={{ color: 'red', textDecoration: 'inherit', fontSize: '1.4em' }}
						>
					    Senate
						</Link>
					</section>
		</header>
	</div>
);

function App() {
	return (
		<Switch>
			<Route exact path="/" render={() => <section>{main}</section>} />
			<Route exact path="/house" render={() => <House />} />
			<Route exact path="/senate" render={() => <Senate />} />
			/>
		</Switch>
	);
}

export default App;
