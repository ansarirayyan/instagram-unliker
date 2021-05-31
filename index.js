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
  //const discoverFirstPage = discoverFeed.items();
//	console.log(type(discoverFeed)); // type is not defined
		// wonder if I got to do that request stuff as seen in account-followers.feed.example.ts 
//	console.log(type(discoverFirstPage));
	//
	const wholeResponse = await discoverFeed.request(); // is this like, all of it? isn't that a lot in a lot of cases lol?

	console.log(wholeResponse); // this was a very underwhelming response lol but ok

	const items = await discoverFeed.items();
  console.log(items); // Here you can reach items. It's array.
	// this is the gold right here I think; realized that afer a whole bunch of stuff down there lol
	console.log("THIS IS ITEMS RIGHT?"); // Al Hamdu Lillah yes indeed

//  const thirdPageItems = await discoverFeed.items();
  // Feed is stateful and auto-paginated. Every subsequent request returns results from next page
//  console.log("thirdPageItems: " + thirdPageItems); // Here you can reach items. It's array.
//  const feedState = discoverFeed.serialize(); // You can serialize feed state to have an ability to continue get next pages.
	// not really understanding this serialize stuff but I think this explains why const is named thirdPageItems
//  console.log("feedState: " + feedState);
//  console.log("feedState type: " + typeof(feedState)); // OH SERIALIZATIN FROM C++; just makes it into text
//  discoverFeed.deserialize(feedState);
  const fourthPageItems = await discoverFeed.items();
  console.log("fourthPageItems: " + fourthPageItems);




  console.log("LOOK HERE => " + items[0].user.username); // WEEEEEEEEEEEEEEEEEEEEEEE ALHAMDULLILLAH IMMA PUSH TO A DIFF BRANCH MAYBE IDK

})();
