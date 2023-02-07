# Jira AI

https://user-images.githubusercontent.com/59159025/217343115-2dbf1f35-11b9-46ff-bf18-eec7b9153b8c.mp4

Jira AI is an application that uses the ChatGPT language model to automatically generate task descriptions in Jira.

## Technologies Used

Forge (Node.js)
React

## Installation

To install Jira AI, you need to follow the following steps:

1. Clone this repository
2. Install dependencies by running `npm install`
3. Generate your OpenAI credentials [Here](https://platform.openai.com/account/api-keys)
4. Configure Jira API access credentials ([Tutorial](https://developer.atlassian.com/platform/forge/getting-started/))
5. Create an app

```bash
# You will only use the `manifest.yml`

# Select the Blank template

forge create
```

6. Move the app's manifest to the repository

```bash
cat <your_app_name>/manifest.yml > jira-ai/manifest.yml
```

7. Export envs

```bash
export FORGE_USER_VAR_OPEN_AI_URL=https://api.openai.com/v1
export FORGE_USER_VAR_OPEN_AI_KEY=<YOUR KEY>
```

8. Deploy the application by running

```bash
npm run deploy

forge install

# Choose JIRA and put in your account URL
```

9. You are now ready to use.

## Usage

After installation, you can use Jira AI to automatically generate task descriptions. Simply follow the instructions in the user interface to use the ChatGPT language model.

## Contribution

If you would like to contribute to the development of Jira AI, follow the following steps:

1. Create a branch for your changes
2. Submit a pull request

## License

This project is licensed under the MIT license. See the LICENSE file for more information.
