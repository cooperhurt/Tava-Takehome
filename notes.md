# Overall Notes 

You can run the project separetly by running:

NOTE:
You must first run install command for client app AND server
```nodejs 
npm i && cd server && npm i
```

There is a helper command for node packages for Client and Server by running:
```nodejs
npm run initialize
```

Server:
```nodejs
npm run start:server
```

Client
```nodejs
npm run start:client
```

Both:
```nodejs
npm run start:server
```

## Project Setup Notes: 
This is a React application with express/node server written in Typescript. Depending on overall use case long term GraphQL server may make more sense, but given the simple requirement of the project I decided to proceed with a Express server.

### Improvments
 - The package.json start scripts had to get creative to get this up and running but overall I think with a little work you could leverage the same tsoncfig file, but ended up having to create essentially another small project. (This may make it hard to distrbute, but for sake of takehome it should be OK)

 - The setting of the page title could be follow a more consisent pattern that could be shared between pages.

 - After deleting Employee it would be nice if there was some kind of snackbar/flash message to alert the user the employee was deleted. But would need to implement some providers and what not to fully implement this or alternatively import a libary like Material UI to do this.

 - Could make the StatusBadge more universal say like `Chip` Component.
