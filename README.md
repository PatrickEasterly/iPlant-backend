# iPlant-backend
Backend for the best gardening app ever. 

## POST 'app/user/login'
Takes JSON object as body of request. requires 'username' and 'password' keys.
Returns JSON object. If username is not in database, ends back status 404 and {'error' : "invalid username"}
If username is valid, check to see if password matches users hash. If no, returns status 403 and {'login':'FAILURE', 'error':'Invalid Password'}
IF username and password are correct, returns status 200 and {'login':"SUCCESS", 'token':${JWT token containing {'userid':(id for username)}}

## POST 'app/user/register'
Takes JSON object as body of request. requires username, password, email. Can also take firstname, lastname.
if username or email already exist in DB, OR if either is not passed in, will send satus 404 and JSON {'register':"FAILURE", 'error': "(username or email) already exists"}
if new user is created, will send JSON {'register':"SUCCESS", 'token':${JWT token containing {'userid':(id for username)}}

## GET '/app/user' 
returns full info card, including plants, rooms, etc. for logged in user.

## PUT '/app/user' 
modifies logged in users(by JWT TOKEN) account. returns new record as JSON.
if either email or username are attempted to be modified to email or username that already exists, 
does not modify record, and returns status (403) and {error : '(username or email) already exists'}

## DELETE '/app/user'
Removes logged in user. Deletes all records in all tables associated with their userid.
logs user out by default, as the userid in JWT token is for a non-existent user.
if no errors, returns deleted user record as JSON.

## GET '/app/plantinfo'
no login required. takes in body {id:(num)}.
returns record for that plantinfo.

## DELETE '/app/plantinfo'
Doesn't do anything. You can't delete plant records via HTTP request.

## PUT '/app/plantinfo'
Doesn't do anything. You can't modify plant records via HTTP request.

## POST '/app/plantinfo'
Must be logged in, but specific user doesn't matter.
if all required fields are present, writes plant to DB and returns it as JSON object.
if any fields are missing, error is returned.

## GET '/app/room' 
Gets ALL rooms for logged in user, based on userid in JWT token.
returns array of all room ojects.

## POST '/app/room' 
Adds new room assigned to logged in user. needs {roomname, hightemp, lowtemp, lightamount}.
uses default values if not all are passed in.
returns object for newly added room.

## PUT '/app/room'
modifies existing room (only fields passed as body keys)and sends back modified room object as JSON, if room belongs to logged in user.
Sends back error JSON if user does not own room, or if integer fields can't be parsed for integers.
Returns object for modified room.

## DELETE '/app/room'
Deletes room (req.body.id) IF room belongs to logged in user.
otherwise sends back error JSON.
returns object of deleted room.

## GET '/app/plant/room'
Must be logged in via JWT. Must pass {roomid:(num)} in body.
Checks if room belongs to logged in user, selects all plants in that room.
returns object with error key if something isn't right.
Returns object with 2 keys. {room:(room object), "plants:(array of all plants in room)"}

## POST '/app/plant/addsensor'
Must be logged in via JWT. Must pass {id:(num)} OR {plantid:(num)} in body.
Removes sensor from previous plant and adds sensor to plant sent as ID.

## POST '/app/plant' 
Must be logged in via JWT. takes in body {roomid:(int), plantinfoid:(int), plantname:(string)} userid from JWT.
checks to see if room for plant belongs to logged in user.
if userid != room.userid returns JSON error object.
if not all required fields are passed, returns JSON error object.
returns object for newly created plant.

## GET '/app/plant'
Must be logged in via JWT. takes in body {id:(num)}. userid from JWT.
if logged in user does not own plant, returns JSON error object.
returns verbose plant info, including room and plantinfo, and all watering events.

## PUT '/app/plant'
must be logged in via JWT. takes in at least 1 key in body {userid:(num), roomid:(num), plantinfoid:(num), plantname:(string)}
if user does not own new room, returns JSON error object.
if update is success, returns whole object of modified plant.

## DELETE '/app/plant'
must be logged in via JWT. takes in body {id:(num)}. userid from JWT.
if logged in user does not own plant, returns JSON error object.
deletes plant, returns deleted plant as JSON object.

## POST '/app/water'
must be logged in via JWT. takes in body {plantid:(num)}. userid from JWT.
checks that plant belongs to user, then creates new water event in water table.
returns water event as JSON Object. watertime is a date object. 

## GET '/app/water'
must be logged in via JWT. takes in body {plantid:(num)}. userid from JWT.
checks that plant belongs to user, then selects all water events for that plant.
returns an array of water event objects.

## DEL '/app/water'
must be logged in via JWT. takes in body {id:(num)}. userid from JWT.
checks that water event exists, and that it belongs to user.
Deletes water event, and returns it as JSON object.