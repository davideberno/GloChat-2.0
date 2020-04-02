const { Translate } = require("@google-cloud/translate").v2;

const config = {
  projectId: "glochat2-1585614391026",
  keyFilename:
    "/home/davide/Desktop/Projects/glo-chat-2.0/server/glochat2-6faedebd0d1c.json"
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
