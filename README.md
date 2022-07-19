<h1 align="center">ft_transcendence</h1>
<p align="center">Real-time multiplayer Pong game website.</p>

<p align="center">
	<img src="https://img.shields.io/github/repo-size/AdmiralXy/42ft_transcendence?color=%2365c534" alt="" height="20"/>
	<img src="https://img.shields.io/github/directory-file-count/AdmiralXy/42ft_transcendence?color=%2365c534" alt="" height="20"/>
</p>

<br/><br/>

<p align="center"><a href="https://github.com/nastyox/Rando.js#nastyox"><img src="http://randojs.com/images/2.0.0-20fps.gif" width="100%"/></a><a href="#nastyox"><img src="http://randojs.com/images/dropShadow.png" width="100%"/></a></p>

<br/>

## :ledger:  Technology stack

* **Docker containers**
  * Backend
  * Frontend
  * Database
  * Nginx webserver
* **Backend**
  * Service-oriented architecture
  * NestJS
  * Socket.io server
  * TypeScript
  * PostgreSQL
* **Frontend**
  * State management design with centralized store for all the components
  * NuxtJS with TypeScript
    * VueJS
    * Vuex
    * Vue Router
  * Socket.io client
  * BootstrapVue
  * SCSS

## :ledger:  Features

* **Authentication**
  * Google/42.fr OAuth2
  * Two-factor authentication with QR codes
* **User**
  * Set unique username
  * Upload avatar
  * View own and other people's profile with stats and latest matches
  * Status: online, offline
* **Pong game**
  * Real-time multiplayer using WebSockets
  * Classic and modern themes
  * Angle-based ball movement
  * Training mode with AI opponent
  * Server-side state protection
  * Matches history and statistics
  * Ability to connect as a spectator, watch a live play between other users without interfering with it
  * Network lag will not disconnect the client, the current state will reach the client as soon as the connection is stable
* **Matchmaking system**
  * Automatic matchmaking queue based on player's rating level
* **Leaderboard**
  * List of top-rated players
* **Friends**
  * Send friend requests
  * Accept friend requests
  * Remove friend
* **Direct chat messaging**
  * Real-time receiving and sending using WebSockets
  * Database-based with chat history
  * Send private messages to your friends
  * Read private messages from your friends
* **Blacklist**
  * Add user to your blacklist
  * Remove user from your blacklist
  * Blacklisted users are not able to chat with you
  * You will not see blacklisted users in your friends list
* **Groups**
  * Client-based chat history, cleared when client disconnects
  * Create and manage groups with 3 different modes:
    * Public: anyone can join and chat
    * Protected: you need to provide a password to join
    * Invite-only: only invited members can join 
  * Different user roles:
    * Default:
      * View user list
      * Invite other users to play a private pong match
      * Send messages in group chat
      * Read messages from group chat
    * Administrator:
      * Default privileges
      * Add users to invite-list
      * Ban user for limited or permanent time
      * Mute user for limited or permanent time
    * Owner:
      * Default and administrator privileges
      * Change group mode to public, protected or invite-only
      * Set or change a group password
      * Give or remove administrator privileges
      * Delete group

## :zap:  Quick start

**Step 1:** Make sure you have Docker, Docker-compose and Makefile installed

**Step 2:** Create .env file in the root directory of project and configure it, see the .env.example file for more information

**Step 3:** Run `make all` to build the project, open the browser and go to http://localhost/ if you are using local environment

**Makefile endpoints:**

```JavaScript
// Start the containers
$> make all

// Stop the containers
$> make stop

// Build the containers
$> make build

// List available containers, images, networks and volumes
$> make list

// Clean builded containers, images, networks and volumes
$> make clean

// Clean builded containers, images, networks, volumes and cache
$> make fclean

// Clean, build, and start the containers
$> make re
```

<br/><br/><br/>

## :tada:  Examples
  ```JavaScript
   rando()                       //a floating-point number between 0 and 1 (could be exactly 0, but never exactly 1)  
   rando(5)                      //an integer between 0 and 5 (could be 0 or 5)  
   rando(5, 10)                  //a random integer between 5 and 10 (could be 5 or 10)  
   rando(5, "float")             //a floating-point number between 0 and 5 (could be exactly 0, but never exactly 5)  
   rando(5, 10, "float")         //a floating-point number between 5 and 10 (could be exactly 5, but never exactly 10)  
   rando(true, false)            //either true or false  
   rando(["a", "b"])             //{index:..., value:...} object representing a value of the provided array OR false if array is empty  
   rando({a: 1, b: 2})           //{key:..., value:...} object representing a property of the provided object OR false if object has no properties  
   rando($("div"))               //{index:..., value:...} object representing a jQuery element from the provided jQuery element set OR false if the provided jQuery element set does not contain any elements.  
   rando("Gee willikers!")       //a character from the provided string OR false if the string is empty. Reoccurring characters will naturally form a more likely return value  
   rando(null)                   //ANY invalid arguments return false  
  ```

### &#8674; Prevent repetitions by grabbing a sequence and looping through it
  ```JavaScript
   randoSequence(5)              //an array of integers from 0 through 5 in random order  
   randoSequence(5, 10)          //an array of integers from 5 through 10 in random order  
   randoSequence(["a", "b"])     //an array of {index:..., value:...} objects representing the values of the provided array in random order  
   randoSequence({a: 1, b: 2})   //an array of {key:..., value:...} objects representing the properties of the provided object in random order  
   randoSequence($("div"))       //an array of {index:..., value:...} objects representing all jQuery elements from the provided jQuery element set in random order.   
   randoSequence("Good gravy!")  //an array of the characters of the provided string in random order  
   randoSequence(null)           //ANY invalid arguments return false
```
<br/><br/><br/>


## :clap:  Supporters
[![Stargazers repo roster for @nastyox/Rando.js](https://reporoster.com/stars/nastyox/Rando.js)](https://github.com/nastyox/Rando.js/stargazers)
[![Forkers repo roster for @nastyox/Rando.js](https://reporoster.com/forks/nastyox/Rando.js)](https://github.com/nastyox/Rando.js/network/members)
<p align="center"><a href="https://github.com/nastyox/Rando.js#nastyox"><img src="http://randojs.com/images/barsSmallTransparentBackground.gif" alt="Animated footer bars" width="100%"/></a></p>
<br/>
<p align="center"><a href="https://github.com/nastyox/Rando.js#"><img src="http://randojs.com/images/backToTopButtonTransparentBackground.png" alt="Back to top" height="29"/></a></p>
