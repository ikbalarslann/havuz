# Turkish Bath Renting Website

This is a website which is similar to hotel booking apps.

[Live](https://www.havuzvehavuz.com/) :point_left:

## Features

### Users

- [x] Register / Log in / Log out
- [x] Search turkish baths
- [x] Display hamam profile profile
- [x] Edit own profile

### Hosts

- [x] Register / Log in / Log out
- [x] Create a Turksh bath profile
- [x] Edit Availability
- [x] See Bookings
- [x] Edit Bookings


### TODO

- [ ] Integration tests (react-testing-library)
- [ ] E2E tests (Cypress)
- [ ] PWA for host side

## Technologies used

- [TypeScript](https://www.typescriptlang.org/)
- [Next](https://www.typescriptlang.org/)
- [Server Actions](https://www.typescriptlang.org/)
- [Tailwind](https://www.typescriptlang.org/)
- [Shadcn](https://www.typescriptlang.org/)
- [Prisma](https://www.typescriptlang.org/) 
- [MongoDB](https://www.typescriptlang.org/)
- [NextAuth](https://www.typescriptlang.org/)
- [Google Oauth](https://www.typescriptlang.org/)
- [Resend](https://www.typescriptlang.org/)
- [UploadThing](https://www.typescriptlang.org/)

  
## Getting started

### Clone repository

```
git clone https://github.com/ikbalarslann/havuz.git
cd havuz
```

### Set up environment variables

```
NODE_ENV ===<Stage of the project, e.g. development>

DATABASE_URL=<The db url from mongoDb, e.g. mongodb+srv://.../>
AUTH_SECRET=<The auth passcode for next auth, e.g. adfasdfadsfa/>

UPLOADTHING_SECRET=<Secret code from upload thing, e.g. sk_live_.../>
UPLOADTHING_APP_ID=<App id from upload thing, e.g. adsfasdfas/>

GOOGLE_CLIENT_ID=<Id from google, e.g. adsfasdfadsfa.apps.googleusercontent.com/>
GOOGLE_CLIENT_SECRET=<Secret code from google, e.g. adshafsdhbdfgnbfn/>

RESEND_API_KEY=<Api key from resend, e.g. re_asdgfadsgsdfgad/>
NEXT_PUBLIC_APP_URL=<url for the app, e.g. http://localhost:3000/>

```

### Install packages and start client

```
npm install
npm run postinstall
npm run build
npm run start
```



