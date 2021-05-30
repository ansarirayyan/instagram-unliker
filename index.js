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

  const thirdPageItems = await discoverFeed.items();
  // Feed is stateful and auto-paginated. Every subsequent request returns results from next page
  console.log("thirdPageItems: " + thirdPageItems); // Here you can reach items. It's array.
  const feedState = discoverFeed.serialize(); // You can serialize feed state to have an ability to continue get next pages.
	// not really understanding this serialize stuff but I think this explains why const is named thirdPageItems
  console.log("feedState: " + feedState);
  console.log("feedState type: " + typeof(feedState)); // OH SERIALIZATIN FROM C++; just makes it into text
  discoverFeed.deserialize(feedState);
  const fourthPageItems = await discoverFeed.items();
  console.log("fourthPageItems: " + fourthPageItems);

//console.log("will this be an array/list?" + typeof(feedState.nextMaxId)); // undefined

  console.log("wonder how this will look liek I started to write this in camel case lol: " + discoverFeed);
//  await ig.media.like(discoverFeed.nextMaxId[0]); // need the deserialzed one 
	//  above line: "YALNISH, COK YALNISH" -- Fehim Pasha ik i spelled wrong
//	console.debug("ISSUE US HERE RIGHT"); // yani, before; yeha it is 
  //console.log("wonder how this will look liek I started to write this in camel case lol: " + discoverFeed);


//console.log(items[0]);
  console.log("LOOK HERE =>" + items[0].user.username); // WEEEEEEEEEEEEEEEEEEEEEEE ALHAMDULLILLAH IMMA PUSH TO A DIFF BRANCH MAYBE IDK

	//  console.log("TYPE OF fourthPageItems: " + typeof(fourthPageItems)); // it's an object
	/* From Oracle Docs:
	 * Real-world objects share two characteristics: 
	 * They all have state and behavior. 
	 * Dogs have state (name, color, breed, hungry) and behavior (barking, fetching, wagging tail). 
	 * Bicycles also have state 
	 * (current gear, current pedal cadence, current speed) and behavior (changing gear, changing pedal cadence, applying brakes)
	 */
	// just for the record, which this will be recorded most likely if I end up pusing to repo, that was a reminder
//  await ig.media.like(fourthPageItems);


//await ig.media.like(discoverFirstPage[0].id);
  // All the feeds are auto-paginated, so you just need to call .items() sequentially to get next page
/*  const myPostsSecondPage = await userFeed.items();
  await ig.media.like({
    // Like our first post from first page or first post from second page randomly
    mediaId: sample([myPostsFirstPage[0].id, myPostsSecondPage[0].id]),
    moduleInfo: {
      module_name: 'profile',
      user_id: loggedInUser.pk,
      username: loggedInUser.username,
    },
    d: sample([0, 1]),
  }); */
})();
