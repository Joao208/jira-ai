import React from "react";
import ForgeUI, {
  render,
  Fragment,
  IssuePanel,
  TextField,
  Form,
  useProductContext,
  useState,
  Button,
  ErrorPanel,
  SectionMessage,
  Text,
} from "@forge/ui";

import { fetchSummaryForIssue } from "./utils/fetchSummaryForIssue";
import { generateDescription } from "./utils/generateDescription";
import { reGenerateDescription } from "./utils/reGenerateDescription";
import { Description } from "./components/description";
import { editDescription } from "./utils/editDescription";

const App = () => {
  const context = useProductContext();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // @ts-ignore
  const issueKey = context.platformContext.issueKey;
  // @ts-ignore
  const issueId = context.id;

  const fetchSummaryForIssuePromise = fetchSummaryForIssue({ issueKey });

  const [description] = useState(async () => await fetchSummaryForIssuePromise);

  const generateDescriptionPromise = generateDescription({
    description,
    issueId,
    issueKey,
  });

  const [descriptionGenerated, setDescriptionGenerated] = useState(
    async () => await generateDescriptionPromise
  );

  const onSubmitChangeWithContext = async (data) => {
    const { "context-for-description": contextForDescription } = data;

    const newDescription = await reGenerateDescription({
      descriptionGenerated,
      additionalContext: contextForDescription,
      issueId,
      issueKey,
    });

    setDescriptionGenerated(newDescription);
  };

  const onSubmitChangeDescription = async () => {
    const response = await editDescription({
      description: descriptionGenerated,
      issueKey,
      issueId,
    });

    if (response.ok) {
      setError("");

      return setMessage(response.message);
    }

    setError(response.message);
  };

  return (
    <Fragment>
      {message ? (
        <SectionMessage title="Info" appearance="info">
          <Text>{message}</Text>
        </SectionMessage>
      ) : null}
      {error ? <ErrorPanel error={{ message: error, name: "Erro" }} /> : null}
      <Description description={descriptionGenerated} />
      <Form
        onSubmit={onSubmitChangeWithContext}
        submitButtonText="Reescrever descrição"
      >
        <TextField
          name="context-for-description"
          label="Você gostaria de dar mais contexto para melhorar a descrição?"
          placeholder="Ex: A task consiste em criar um bot para o slack que faça tal coisa."
        />
      </Form>
      <Button
        text="Usar essa descrição"
        onClick={onSubmitChangeDescription}
        appearance="primary"
      />
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
