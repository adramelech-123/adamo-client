# ADAMO ID CLIENTSIDE 

## Setup Instructions

This client-side app is structured into two folders
- ciient
- server

Each of these folders will need to be run separately as follows:

### Server Folder

Open a terminal and execute the commands below.

```bash
cd server && npm install # Change directory into the server folder and install dependencies
node index.js # Run the server
```

### Client Folder

In another terminal execute the commands below:

```bash
cd client && npm install
```

After running the installation and before running the client, you will need to setup a firebase account and create a firestore database. Create a `.env` file with the following contents (note that these contents are not real and you will have to use your own configuration provided by your firebase account)

```
VITE_APIKEY=Aibt5464788Ghtts123;
VITE_AUTHDOMAIN=xxxx-1234.firebaseapp.com
VITE_PROJECTID=xxxx-1234
VITE_STORAGEBUCKET=xxxx-1234.firebasestorage.app
VITE_MESSAGINGSENDERID=987654321
VITE_APPID=1:123456789:web:67yhsgd7836345tdgtte
```

When your firebase is setup and running you can now go ahead and run the clientside app in development mode:

```bash
npm run dev
```