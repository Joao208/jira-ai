import api, { storage } from "@forge/api";

const OpenAIApiKey = process.env.OPEN_AI_KEY;
const OpenAIUrl = process.env.OPEN_AI_URL;

export const generateDescription = async ({
  description,
  issueKey,
  issueId,
}) => {
  try {
    const storageKey = "generatedDescription" + issueKey + issueId;

    if (!(description instanceof Object)) return description;

    const storageDescription = await storage.get(storageKey);

    if (storageDescription) return storageDescription;

    const { descriptionFormatted, summary } = description;

    let prompt = "";

    prompt +=
      "Gere uma descrição em markdown com quebra de linha para a seguinte tarefa com o título: ";
    prompt += summary;
    prompt += "\n\n";
    prompt += "E a seguinte descrição ou template: ";
    prompt += descriptionFormatted;

    const bodyInJSON = JSON.stringify({
      n: 1,
      max_tokens: 1500,
      prompt,
      temperature: 0.5,
      top_p: 1,
    });

    // @ts-ignore
    const response = await api.fetch(
      OpenAIUrl + "/engines/text-davinci-003/completions",
      {
        body: bodyInJSON,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OpenAIApiKey}`,
        },
      }
    );

    console.log(response);

    const data = await response.json();

    console.log(data);

    await storage.set(storageKey, data.choices[0].text);

    return data.choices[0].text;
  } catch (error) {
    console.log(error);

    return "Não foi possível gerar a descrição.";
  }
};
