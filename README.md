# IronMan-HR
Welcome to the Save Gudetama typing game! The typing game for "adults."

For 2-player, hit "Enter." For single-player, click "Start."

You will probably encounter bugs like not being able to get past 'WAITING...' and/or starting before both users are ready. Your answers are in server/index.js, which contains all socket logic. Console.log "rooms" at each stage (entering room, ready, loss, leaving room) to see its value. It's currently set to only run when 2 users are in a room - any more or fewer and it won't work.

Suggestions for where to go from here - take or leave!
- allow users to join a "board" like Hack Reactor, where high scores are displayed. Allow users to challenge other users to create dynamic "rooms." (Right now, the "room" is hardcoded to "scottVsLina" in index.jsx). You'll have to change the data schema to do this.
- game logic - sometimes there are bugs with the logic in server/index.js to determine who is in the "room." These will probably get ironed out if you're tackling the above issue.
- display the round to user
- add spedometer to show typing speed
- CSS - center the cracked egg, show a different GIF depending on if you win or lose, improve the look of the loser's stack of bricks

LOGIN AND CONFIGURATION INFO:

App URL: https://tranquil-stream-98217.herokuapp.com/

Heroku:
scott.mccreary.11@gmail.com
pw: IronMan-HR

Database- AWS RDS:
username: IronMan pw: IronMan-HR
name: humptydumpty port: 3306