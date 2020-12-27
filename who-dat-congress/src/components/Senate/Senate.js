import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Senate.css";
import Card from "../Card/Card";
import shuffle from "shuffle-array";

const Senate = () => {
  const [allMembers, setAllMembers] = useState([])
  const [selectedMember, setSelectedMember] = useState({})

  useEffect(() => {
    loadMembers();
  }, []);
  
  useEffect(() => {
    if(allMembers){
      setSelectedMember(shuffle.pick(allMembers))
    }
	},[allMembers])

  const loadMembers = () => {
    var myHeaders = new Headers();
    myHeaders.append("X-API-Key", "uFMDoeej59MBKmv2peA9Sxnt2bHEReqwp9blNDFG");
    
    fetch("https://api.propublica.org/congress/v1/116/Senate/members.json", {
      method: 'GET',
      headers: myHeaders
    })
      .then(response => response.json())
      .then(result => setAllMembers(result.results[0].members))
      .catch(error => console.log('error', error));
  };

  if(!selectedMember){
    return (
      <>
        <h2>Loading...</h2>
      </>
    )
  } else {

    return (
      <section className="App-header">
			<h2>Senate</h2>
      <Card id={selectedMember.id} />
			<Link to={"/"} className="back-button" style={{ textDecoration: "none" }}>
				Back
			</Link>
		</section>
	);
}
};

export default Senate;
