const prompts = require('prompts');
require('dotenv').config()
const { IgApiClient, IgLoginTwoFactorRequiredError } = require('instagram-private-api');
const { sample } = require('lodash');
const Bluebird = require('bluebird');
const inquirer = require('inquirer');

const ig = new IgApiClient();

// You must generate device id's before login.
// Id's generated based on seed
// So if you pass the same value as first argument - the same id's are generated every time
ig.state.generateDevice(process.env.IG_USERNAME);
// Optionally you can setup proxy url; if you know anyhing about me, I don't like doing anything optional lol
(async () => {
  /* const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  process.nextTick(async () => await ig.simulate.postLoginFlow()); */

return Bluebird.try(() => ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD)).catch(
    IgLoginTwoFactorRequiredError,
    async err => {
      const {username, totp_two_factor_on, two_factor_identifier} = err.response.body.two_factor_info;
      // decide which method to use
      const verificationMethod = totp_two_factor_on ? '0' : '1'; // default to 1 for SMS
      // At this point a code should have been sent
      // Get the code
      const { code } = await inquirer.prompt([
        {
          type: 'input',
          name: 'code',
          message: `Enter code received via ${verificationMethod === '1' ? 'SMS' : 'TOTP'}`,
        },
      ]);
      // Use the code to finish the login process
      return ig.account.twoFactorLogin({
        username,
        verificationCode: code,
        twoFactorIdentifier: two_factor_identifier,
        verificationMethod, // '1' = SMS (default), '0' = TOTP (google auth for example)
        trustThisDevice: '1', // Can be omitted as '1' is used by default
      });
    },
  ).catch(e => console.error('An error occurred while processing two factor auth', e, e.stack));

  // Create UserFeed instance to get loggedInUser's posts
  //const userFeed = ig.feed.user(loggedInUser.pk);
  //const myPostsFirstPage = await userFeed.items(); // OH THIS VAR NAME LOL THIS IS FOR MY POSTS MY OWN LOL AND IS UNDEFINED


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
