require('dotenv').config()
const { IgApiClient } = require('./node_modules/instagram-private-api/dist');
const { sample } = require('lodash');
const ig = new IgApiClient();
// console.log("selaam habibi is there an ishu here?"); no there is not
// You must generate device id's before login.
// Id's generated based on seed
// So if you pass the same value as first argument - the same id's are generated every time
ig.state.generateDevice(process.env.IG_USERNAME);
// Optionally you can setup proxy url; if you know anyhing about me, I don't like doing anything optional lol
// ig.state.proxyUrl = process.env.IG_PROXY;
(async () => {
  // Execute all requests prior to authorization in the real Android application
  // Not required but recommended
//  await ig.simulate.preLoginFlow();
//console.log("might be an issue here?");
	//there issue right below habibi; makes sense
// console.log("here is supposed to be the username:" + process.env.IG_USERNAME); // aha, so tha y nothing there w/o xtra words
	// this issue has been resolved Alhamdulillah
  const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
	// so this above line actually does indeed return an ... actually idk it gives back 400 bad req
//console.log("or maybe here");
  // The same as preLoginFlow(); wait, what is? the const loggedInUser stuff?
	// seems like it
// currentUserPerson = ig.key.currentUser(); //idk what im doing her
//	console.log("this is the current user:" + currentUserPerson);
  // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
  // process.nextTick(async () => await ig.simulate.postLoginFlow());
	// don't think this is needed according to account-followers.feed.example.ts example
  // Create UserFeed instance to get loggedInUser's posts
  //const userFeed = ig.feed.user(loggedInUser.pk);
  //const myPostsFirstPage = await userFeed.items(); // OH THIS VAR NAME LOL THIS IS FOR MY POSTS MY OWN LOL AND IS UNDEFINED
	console.log("can this be printed?"+loggedInUser.pk);

  const discoverFeed = ig.feed.discover(loggedInUser.pk);


	const items = await discoverFeed.items();
  console.log(items); // Here you can reach items. It's array.


  userInputtedString = "kooltool123"
  i = 0
  while (i < items.length) {
	  // this should be only 4 spaces but whatever
	  // remwmber, items.length is always one more than max index value of array/ls
	  // i forget what are the differences between array and list again lol
	  
	  if (items[i].user.username.includes(userInputtedString)) {
		  console.log("Is this what you asked for, mate? " + items[i].user.username);
		  // always gotta type in items[0].user.username; aybe shud make some var
		  // idk if items[0].user.username.includes(userInputtedString) will work or not
		  // maybe it will, but maybe sometime sit won't in pure JS on web browsers so that y they always make us reassign vars or something idk

		  console.log("Really? This is what you requested: " + userInputtedString);
		  // prolly a good idea to put this here
		  // hald-screen with ... whatever
	  } else {
		console.log("What's up doc?");
	  }

	  i = i + 1;
  }
  

	console.log("LOOK HERE => " + items[0].user.username); // WEEEEEEEEEEEEEEEEEEEEEEE ALHAMDULLILLAH IMMA PUSH TO A DIFF BRANCH MAYBE IDK

})();
