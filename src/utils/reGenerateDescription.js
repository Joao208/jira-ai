import api, { storage } from "@forge/api";

const OpenAIApiKey = process.env.OPEN_AI_KEY;
const OpenAIUrl = process.env.OPEN_AI_URL;

export const reGenerateDescription = async ({
  descriptionGenerated,
  additionalContext = "",
  issueId,
  issueKey,
}) => {
  try {
    const storageKey = "generatedDescription" + issueKey + issueId;

    let instruction = "";

    instruction +=
      "Reescreva a descrição abaixo de uma tarefa mantendo a estrutura com o contexto adicional: ";
    instruction += additionalContext;

    console.log(instruction);

    const bodyInJSON = JSON.stringify({
      model: "text-davinci-edit-001",
      input: descriptionGenerated,
      temperature: 0.5,
      instruction,
    });

    // @ts-ignore
    const response = await api.fetch(OpenAIUrl + "/edits", {
      body: bodyInJSON,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OpenAIApiKey}`,
      },
    });

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
