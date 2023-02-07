export const getHeadSize = (text) => {
  const headingSize = {
    "#": "large",
    "##": "medium",
    "###": "small",
  };

  const headingSizeInNumber = {
    "#": 1,
    "##": 2,
    "###": 3,
  };

  const regex = /#{1,}/g;

  const headingSizeFound = regex.exec(text);

  const firstHeadingSizeFound = headingSizeFound && headingSizeFound[0];

  return {
    headSize: headingSize[firstHeadingSizeFound],
    regex,
    headingSizeInNumber,
  };
};
