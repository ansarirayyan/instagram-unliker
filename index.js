const prompts = require('prompts');
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
  const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
// oes that preLoginFlow stuff make it less likely to gte banned
	// idk i think it said somewher eit was the same thign as something else; oh well
	// yeah right below
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

//  const discoverFeed = ig.feed.discover(loggedInUser.pk);
  // i don't think these are actual osts but people recommended to you lol
	// I could add a whole menu option thing but maybe later lol

const discoverFeed = ig.feed.liked(loggedInUser.pk);
	// Alhamdulillah I think I did it time to push lol

	const items = await discoverFeed.items();
  console.log(items); // Here you can reach items. It's array.


  const response = await prompts({
    type: 'text',
    name: 'desiredUsernameToSearchFor',
    message: 'Which dude you wanna filter for?: ',
  });

  console.log(response.desiredUsernameToSerarchFor); // => { value: 24 } from ex code
	// should name be capitalized (first leter) in camel case?

	userInputtedString = response.desiredUsernameToSearchFor;

  i = 0
  while (i < items.length) {
	  // remwmber, items.length is always one more than max index value of array/ls
	  // i forget what are the differences between array and list again lol
	 
          username = items[i].user.username;

	  if (username.includes(userInputtedString)) {
		  console.log("Is this what you asked for, mate? " + username);
		  // always gotta type in items[0].user.username; aybe shud make some var
		  // idk if items[0].user.username.includes(userInputtedString) will work or not
		  // maybe it will, but maybe sometime sit won't in pure JS on web browsers so that y they always make us reassign vars or something idk

		 // console.log("Really? This is what you requested: " + userInputtedString);
	  } else {
//		console.log("What's up doc?");
		console.log("This one didn't make the cut: " + username );
	  }

	  i = i + 1;
  }
  


})();
