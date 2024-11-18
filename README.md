
# ART SPACE

ArtSpace is an e-commerce platform connecting independent artists with art collectors and enthusiasts through virtual galleries, offering innovative promotional features.


## Installation

Install all the depedencies with npm

```bash
  npm install
```

Then you can run the project in development server with npm
```bash
 npm run dev
```

    
## Deployment

To deploy this project to the production. You have to build it first with 
```bash
npm run build
```
Then start the production app 
```bash
npm run start
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` = "postgresql://<host username>:<host user password>@localhost:5432/main_project?schema=public"

as the enviroment for the prisma orm



![Logo](./src/public/Logo.png)


## Problem Statement

### For Artist :
- Difficulty in effectively promoting their works to a global audience without an online marketing platform.
### For Consumers/Buyer :
- Limited access to original and unique artwork from independent artists.
- Lack of personalized features and direct interaction with artists

## Key Features
- Virtual Galleries
- E-commerce Integration
- Auction System
- Reviews and Rating

## Bussiness Model
- Sales Commision
- Listing Fee and Premium Subscription
- Paid Advertising
- Auction Fee

## Next Step
- Finalize design after user feedback
- Begin core feature development (galleries, e-commerce, auctions)
- Beta testing with local artists
- Continuous updates based on user input