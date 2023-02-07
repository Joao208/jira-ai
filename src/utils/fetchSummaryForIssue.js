import api, { route } from "@forge/api";
import { formatDescription } from "./formatDescription";

export const fetchSummaryForIssue = async ({ issueKey }) => {
  try {
    const res = await api
      .asUser()
      .requestJira(route`/rest/api/3/issue/${issueKey}`);

    const data = await res.json();

    const descriptionFormatted = formatDescription(data.fields.description);

    return {
      descriptionFormatted,
      summary: data.fields.summary,
    };
  } catch (error) {
    console.log(error);

    return "Não foi possível buscar a descrição.";
  }
};
