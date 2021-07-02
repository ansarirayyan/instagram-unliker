const prompts = require('prompts');
require('dotenv').config()
const { IgApiClient } = require('instagram-private-api');
const { sample } = require('lodash');
const ig = new IgApiClient();
// You must generate device id's before login.
// Id's generated based on seed
// So if you pass the same value as first argument - the same id's are generated every time
ig.state.generateDevice(process.env.IG_USERNAME);
// Optionally you can setup proxy url; if you know anyhing about me, I don't like doing anything optional lol
(async () => {
  const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  process.nextTick(async () => await ig.simulate.postLoginFlow());
  // Create UserFeed instance to get loggedInUser's posts
  //const userFeed = ig.feed.user(loggedInUser.pk);
  //const myPostsFirstPage = await userFeed.items(); // OH THIS VAR NAME LOL THIS IS FOR MY POSTS MY OWN LOL AND IS UNDEFINED

//  const discoverFeed = ig.feed.discover(loggedInUser.pk);
  // i don't think these are actual osts but people recommended to you lol
	// I could add a whole menu option thing but maybe later lol

const likedFeed = ig.feed.liked(loggedInUser.pk);
	// Alhamdulillah I think I did it time to push lol

	const items = await likedFeed.items();
  // console.log(items); // Here you can reach items. It's array.


  const response = await prompts({
    type: 'text',
    name: 'desiredUsernameToSearchFor',
    message: 'Which dude you wanna filter for?: ',
  });

  console.log(response.desiredUsernameToSerarchFor);

	userInputtedString = response.desiredUsernameToSearchFor;

  i = 0
  while (i < items.length) {

          username = items[i].user.username;
	  postId = items[i].id

	  if (username.includes(userInputtedString)) {
		  console.log("Is this what you asked for, mate? " + username);

		  console.log(":::::::LOOK HERE: " + postId);
		  //ig.media.unlike(postId);
		  const likeResult = await ig.media.unlike({
        mediaId: postId,
        moduleInfo: {
          module_name: 'profile',
          user_id: loggedInUser.pk,
          username: loggedInUser.username,
        },
        d: 1,
      });
      console.log(likeResult);
	  } else {
		  console.log("This one didn't make the cut: " + username );
	  }

	  i = i + 1;
  }
})();
