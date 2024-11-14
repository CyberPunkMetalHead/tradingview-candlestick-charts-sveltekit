npx sv create - follow the on-screen instructions
select SvelteKit minimal
select Yes, using Typescript syntax
select Prettier, eslint, TailwindCSS
select npm

npm install lightweight-charts

run npm run dev to access a local version of your web app at http://localhost:5173/

under the lib directory, go ahead and create a sub-directory called "types." Inside this directory, we'll go ahead and create a "PriceData.ts" file, and inside it we will define a type for our price data.

Under the same directory let's create a new sub-directory called enums. The coins data api requires us to pass it a vs_currency. CoinGecko provides an endpoint from where we can fetch all possible values for this parameter so we'll just go ahead and store them inside an enum for easy access. Create a file called VsCurrencyEnum.ts. 

Now let's go back up the lib directory and create a subdirectory called "providers". Inside this sub-directory we'll create a File all "PriceDataProvider.ts". This is where we'll be making our calls to the CoinGecko API to fetch the relevant data. [explain everything in that file]

Now that we have a way to call the CoinGeckoAPI - we're going to need a way to call it from the frontend. Under src/routes go ahead and create a file called +page.server.ts.  

This is all part of SvelteKit's routing system. What we've done here is we've created a route that will allow us to chart different coin data based on the "coin" parameter. So once we put everything together, passing the /chart?coin=bitcoin parameter to our URL should show us a chart for Bitcoin. This is based on CoinGecko API Ids, which in many cases consist of the lowercase name of the coin, but there are exception, so expect the route to through a 404 error if the id does not exist or is wrong.

under the lib directory, we'll go ahead and create a sub-directory called "stores". [explain what a store is]. Inside stores, we