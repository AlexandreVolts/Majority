# API.md

Here is how to use to Majority's API.
{url} is to be replaced by the url where the server is host.
If you are in local, the address might be ```http://localhost:8080```

## Rooms

### 1) Get a room

```GET {url}/room/{id}```

Returns the {id} room.
A 404 error is sent if room doesn't exists.

*Url Parameters:*

* id: The id of the room, as a 4-digits hexadecimal number.

*Returns a Room object.*

### 2) Get all rooms

```GET {url}/room```

*Returns an array of Room objects*

### 3) Creating a room

```POST {url}/room```

*Body Parameters:*

Nah that's a joke, you haven't to pass any paramater. The room's id is automatically choosen.

*Returns a little json object containing the "id" property of the created room.*

## Objects

### Room
* id:string
* players:Player[] = An array of Player, containing infos about all the players in the room.

### Player

* username:string
* lifes:number