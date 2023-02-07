export const formatDescription = (description) => {
  let text = "";

  const descriptionInString = JSON.stringify(description);

  var regex = /"text":"(.*?)"/g;

  const a = descriptionInString.matchAll(regex);

  for (const match of a) {
    text += match[1] + "\n\n";
  }

  return text;
};
