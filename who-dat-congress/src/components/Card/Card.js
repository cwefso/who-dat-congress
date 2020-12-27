import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ id }) => {
	const [member, setMember] = useState({});
  const [imageURL, setImageUrl] = useState("");
  const [active, setActive] = useState(false);

	useEffect(() => {
		loadMember();
		setImageUrl(`https://theunitedstates.io/images/congress/450x550/${id}.jpg`);
	}, []);

	const loadMember = () => {
		var myHeaders = new Headers();
		myHeaders.append("X-API-Key", "uFMDoeej59MBKmv2peA9Sxnt2bHEReqwp9blNDFG");

		fetch(`https://api.propublica.org/congress/v1/members/${id}.json`, {
			method: "GET",
			headers: myHeaders,
		})
			.then((response) => response.json())
			.then((result) => setMember(result.results[0]))
			.catch((error) => console.log("error", error));
  };
  
  const toggleActive = () => {
    if(active === true){
      setActive(false)
    } else {
      setActive(true)
    } 
  }

	let committees = <h3>Loading</h3>;

	if (member.roles) {
		console.log("member", member.roles[0].committees[0]);
		committees = member.roles[0].committees.map((committee) => (
			<section className="committee">
				<h3>{committee.name}</h3>
			</section>
		));

		return (
			<section className="App-header">
				<section className="container">
					<section className="profile">
						<img src={imageURL} alt="profile-img"></img>
          {active && 
						<h2>
							{member.first_name} {member.last_name}, {member.roles[0].state}, {member.roles[0].district}
							{member.roles[0].party}
						</h2>}
					</section>
          {active &&
					<section className="committees">
						<h3>Committees</h3>
						{committees}
					</section>
          }
				</section>
        <button onClick={toggleActive}>Flip</button>
			</section>
		);
	} else {
		console.log("Loading");
		return <section>Loading...</section>;
	}
};

export default Card;
