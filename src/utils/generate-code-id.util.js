const generateCodeId = (numberOfCode) => {
  let generateResult = "";
  let countLoop = 0;
  const charRules =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charRuleLength = charRules.length;

  while (countLoop < numberOfCode) {
    generateResult += charRules.charAt(
      Math.floor(Math.random() * charRuleLength)
    );
    countLoop += 1;
  }

  return generateResult;
};

module.exports = generateCodeId;
