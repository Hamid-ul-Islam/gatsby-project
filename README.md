# Hot Wheels Rift Rally

Shopify storefront and marketing landing page.

### **Develop the codebase**

1. Clone the project from Github OR receive via email via zip and unzip the file.
   You've probably already done this if you're ready this how-to guide
2. Navigate into your new site’s directory in Visual Studio Code or another code edtior.
3. Open the terminal in Visual Studio Code or another code editor.
4. Install the project dependencies with npm.
   ```shell
   npm install --legacy-peer-deps
   ```
5. (1/2) Rename the `.env.example` file to `.env` and add the API keys (provided over Microsoft Teams)

6. Start your website in development mode.
   ```shell
   npm run develop
   ```
7. Your site is now running at `http://localhost:8000`! You can visit your website in development mode through
   your Internet browser of choice, and check out `http://localhost:8000/kings`, `http://localhost:8000/ducks`,
   `http://localhost:8000/music`, or `http://localhost:8000` for the Hub.
8. For more information on interacting with the codebase and editing the files, please scroll to [About this project](#about-this-project) and [Quick Development Tutorial](#quick-development-tutorial)
9. To commit according to this repo's specifications, instead of git commit, for prompts on the correct commit format,
   run the command

```shell
npm run cz
```

You may need to install commitizen globally.

### **Build and Deploy the website**

1. If you have development mode running, click into the Terminal window and hit CTRL-C for Mac.
2. Run the build command.

```shell
npm run build
```

3. Once the site finishes building (ie, it says ✨ Done in 30.22s. in the terminal window), you have the option to deploy the website by copy and pasting the contents of the **public/** folder into the web host directory of your choice.

**4. OR Deploy the website through AWS.**

1. First, create a new environment variable file. Rename the file ".env.sample" to ".env" OR copy env.sample" and rename as ".env" OR programmatically create the .env file by running:

```
### mac only
touch .env
```

2. Copy the contents of .env.smaple into .env if not already present.
3. Fill out your FTP provider's information in the provided AWS variables.

```
GATSBY_AWS_TARGET_BUCKET_NAME=
GATSBY_AWS_CLOUDFRONT_DISTRIBUTION=
```

4. Save the .env file.
5. Open your terminal. In the terminal window, run:

```shell
npm run deploy
```

### Requirements

- Node.js >= 16.9

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more information.
