# Socket.md

## Socket client's commands

### Identify a user in a room

```EVENT "ET:Majority:connection"```

*Params*
You must send a ```MajorityPacketType.Connection``` object.
It contains:
* roomId:string
* username:string

## Socket server's messages