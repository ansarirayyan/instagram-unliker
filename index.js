const prompts = require('prompts');
require('dotenv').config()
const { IgApiClient, IgLoginTwoFactorRequiredError } = require('instagram-private-api');
const { sample } = require('lodash');
const Bluebird = require('bluebird');
const inquirer = require('inquirer');
const sleep = require('sleep');

const ig = new IgApiClient();

// You must generate device id's before login.
// Id's generated based on seed
// So if you pass the same value as first argument - the same id's are generated every time
ig.state.generateDevice(process.env.IG_USERNAME);
// Optionally you can setup proxy url; if you know anyhing about me, I don't like doing anything optional lol
(async () => {
  /* const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  process.nextTick(async () => await ig.simulate.postLoginFlow()); */

  (async () => {
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
  });

const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD)
process.nextTick(async () => await ig.simulate.postLoginFlow());
  // var twoFALoginResult = await twoFA.login();
  //console.log("::::::: " + twoFALoginResult);

  // Create UserFeed instance to get loggedInUser's posts
  //const userFeed = ig.feed.user(loggedInUser.pk);
  //const myPostsFirstPage = await userFeed.items(); // OH THIS VAR NAME LOL THIS IS FOR MY POSTS MY OWN LOL AND IS UNDEFINED

  const questions = [
    {
      type: 'text',
      name: 'username',
      message: 'Which user do you wanna filter for?',
    },
    {
      type: 'number',
      name: 'index',
      message: 'What\'s the index that you stopped at? (default: 0)',
      initial: 0
    }
  ];

	const userResponse = await prompts(questions);
  const usernameToSearchFor = userResponse.username;
  const indexAtWhichUserStoppedAt = userResponse.index;

  var counter = 0;
  const likedFeed = ig.feed.liked(loggedInUser.pk);
  var items = await likedFeed.items();
  while (true) {
    //const likedFeed = ig.feed.liked(loggedInUser.pk);
  //var items0 = await likedFeed.items();
    // Here you can reach items. It's array.
  //var items = await likedFeed.items();
    /*var items = [];
    var index = (indexAtWhichUserStoppedAt + 1);

    try {
      int iI = 0;
      while (iI < i) {
        
        iI++;
      }
    } catch (e) {
      console.log("\x1b[41m%s\x1b[0m", "THERE WAS AN ERROR: " + e);
        // I guess only one '%s' needed here
      break;
    } */

  var iI = 1;
  //var items; // actually maybe this will work
  while (iI < counter) {
    items = await likedFeed.items();
    iI++;
  } // not sure if this while-loop stuff will work

  i = 0
  while (i < items.length) {

    username = items[i].user.username;
	  postId = items[i].id

	  if (username.includes(usernameToSearchFor)) {
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
  } //sleep.sleep(sample([5, 6, 7])); // not sure if to put here or in other while loop
      /* I think her eis fine because no requests made inside the whole loop unless
       * it's a match but that's kind of leaving it to chance but whatever */
    var numberOfTimeOfSleep = sample([5, 6, 7]);
    console.log("SLEEPING FOR THIS LONG: " + numberOfTimeOfSleep);
    sleep.sleep(numberOfTimeOfSleep);
  //} catch (e) {console.log("\x1b[41m%s\x1b[0m", "THERE WAS AN ERROR: " + e);
      // I guess only ne '%s' needed here
  //  break;}
  counter++;
  }
})();
