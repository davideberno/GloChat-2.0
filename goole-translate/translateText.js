const { Translate } = require("@google-cloud/translate").v2;

const config = {
  projectId: process.env.GOOGLE_PROJECT_ID,
  keyFilename: "/home/davide/Downloads/glochat2-ee4b22d8ed00.json",
};

module.exports = (text, target) => {
  const translate = new Translate(config);

  async function translateText() {
    try {
      let [translations] = await translate.translate(text, target);
      translations = Array.isArray(translations)
        ? translations
        : [translations];
      console.log("Translations:");
      translations.forEach((translation, i) => {
        console.log(`${text[i]} => (${target}) ${translation}`);
      });
      return translations;
    } catch (err) {
      console.log(err);
    }
  }

  return translateText();
};
