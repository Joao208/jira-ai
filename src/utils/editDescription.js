import API, { route, storage } from "@forge/api";

export const editDescription = async ({ issueKey, description, issueId }) => {
  try {
    const body = JSON.stringify({
      fields: { description },
    });

    const response = await API.asUser().requestJira(
      route`/rest/api/2/issue/${issueKey}`,
      {
        method: "PUT",
        body,
      }
    );

    if (response.status === 204) {
      const storageKey = "generatedDescription" + issueKey + issueId;

      await storage.set(storageKey, "Descrição limpa");

      return {
        ok: true,
        message:
          "Descrição editada com sucesso. Por favor recarregue a página.",
      };
    }

    return { ok: false, message: "Erro ao editar a descrição." };
  } catch (error) {
    console.log(error);

    return { ok: false, message: "Erro ao editar a descrição." };
  }
};
