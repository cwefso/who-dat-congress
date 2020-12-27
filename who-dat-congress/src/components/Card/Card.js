import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import Flippy, { FrontSide, BackSide } from "react-flippy";

const Card = ({ id, chamber }) => {
	const [member, setMember] = useState({});
	const [imageURL, setImageUrl] = useState("");


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

	let committees = <h3>Loading</h3>;
	let leadership;

	if (member.role) {
		leadership = <section>{member.roles[0].leadership_role}</section>;
	} else {
		leadership = <section>None</section>;
	}

	if (member.roles) {
		committees = member.roles[0].committees.map((committee) => (
			<li>{committee.name}</li>
		));

		return (
			<section className="App-header">
				<Flippy flipOnClick={true}>
					<FrontSide style={{ backgroundColor: '#282c34'}}>
						<main>
							<section className="container">
								<section className="profile">
									<h2>{chamber}</h2>
									<img src={imageURL} alt="profile-img"></img>
								</section>
							</section>
						</main>
					</FrontSide>
					{chamber === "House" && (
					<BackSide
					style={{ backgroundColor: '#282c34'}}
					>
							<main>
								<section className="container">
									<section className="profile">
										<h2 style={{ opacity: "0", marginTop: "4vh"}}>{chamber}</h2>
										{/* <img src={imageURL} alt="profile-img"></img> */}
										<section className="committees">
											<ul>
												<li>
													Name: Rep. {member.first_name} {member.last_name}
												</li>
												<li>Party: {member.roles[0].party}</li>
												<li>
													State: ({member.roles[0].state}-
													{member.roles[0].district})
												</li>
												<li>Leadership Role: {leadership}</li>
												<li>
													Committees:
													<ul>{committees}</ul>
												</li>
												<li>
													<a
														href={`https://www.opensecrets.org/search?q=${member.first_name}+${member.last_name}&type=indiv`}
														style={{ color: "white" }}
													>
														Open Secrets Search
													</a>
												</li>
											</ul>
										</section>
									</section>
								</section>
							</main>
						</BackSide>
						)}
						{chamber === "Senate" && (
						<BackSide
						style={{ backgroundColor: '#282c34'}}
						>
						<main>
							<section className="container">
								<section className="profile">
									<h2 style={{ opacity: "0", marginTop: "4vh"}}>{chamber}</h2>
									{/* <img src={imageURL} alt="profile-img"></img> */}
									<section className="committees">
										<ul>
											<li>
												Name: Sen. {member.first_name} {member.last_name}
											</li>
											<li>Party: {member.roles[0].party}</li>
											<li>
												State: {member.roles[0].state}
											</li>
											<li>Leadership Role: {leadership}</li>
											<li>
												Committees:
												<ul>{committees}</ul>
											</li>
											<li>
												<a
													href={`https://www.opensecrets.org/search?q=${member.first_name}+${member.last_name}&type=indiv`}
													style={{ color: "white" }}
												>
													Open Secrets Search
												</a>
											</li>
										</ul>
									</section>
								</section>
							</section>
						</main>
					</BackSide>
					)}
					
					</Flippy>
					<section className="links">
							<Link
								to={"/"}
								className="back-button"
								style={{ color: "inherit", textDecoration: "inherit" }}
							>
								Home
							</Link>
							<Link
								to={`/${chamber}`}
								className="back-button"
								style={{ color: "inherit", textDecoration: "inherit" }}
								onClick={() => {
									window.location.reload(false);
								}}
							>
								Next
							</Link>
						</section>
				</section>
				);
	} else {
		console.log("Loading");
		return <section>Loading...</section>;
	}
};

export default Card;

