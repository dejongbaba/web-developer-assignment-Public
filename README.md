# Setup Instruction

This readme is a guide on how to setup the project on your local machine

- First clone the repo with this
  link [here](http://https://github.com/dejongbaba/web-developer-assignment-Public "here")
- Next you want to setup the backend first so that the frontend has a ready pool of data to work with and prevent any
  form of frontend errors.

## Backend

Once you have successfully cloned the project, go into your editor and open your terminal and run the command

```shell
cd backend
```

Once that is done run

```shell
npm install
```

then run

```shell
npm run dev
```

the app should be running on port

```shell
http//localhost:3004
```

## Frontend

On the frontend, open a new terminal and run the command

```shell
cd frontend
```

add a .env file to the root of the frontend project

```shell
VITE_API_URL=http://localhost:3004
```

Once that is done run

```shell
npm install
```

then run

```shell
npm run dev
```

the application should run successfully fetching date from the backend and displaying appropriately on the frontend.

