/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["random"],
  category: "group",
  description: "Tag/Ping all members in group.",
  cooldown: 5 * 1000,
  groupOnly: true,
  callback: async ({ client, msg, fullArgs, message }) => {
    const { from, quoted } = msg;
    const meta = await client.groupMetadata(from);
    const groupMem = meta.participants;

    const randomIndex = Math.floor(Math.random() * groupMem.length);
    const selected = groupMem[randomIndex].id;
    const selectedName = groupMem[randomIndex].name

    const randomBadword = [
      "Anjing",
      "Babi",
      "Kunyuk",
      "Bajingan",
      "Asu",
      "Bangsat",
      "Kampret",
      "Kontol",
      "Memek",
      "Ngentot",
      "Pentil",
      "Perek",
      "Pepek",
      "Pecun",
      "Bencong",
      "Banci",
      "Maho",
      "Gila",
      "Sinting",
      "Tolol",
      "Sarap",
      "Setan",
      "Lonte",
      "Hencet",
      "Taptei",
      "Kampang",
      "Pilat",
      "Keparat",
      "Bejad",
      "Gembel",
      "Brengsek",
      "Tai",
      "Anjrit",
      "Bangsat",
      "Fuck",
      "Tetek",
      "Ngulum",
      "Jembut",
      "Totong",
      "Kolop",
      "Pukimak",
      "Bodat",
      "Heang",
      "Jancuk",
      "Burit",
      "Titit",
      "Nenen",
      "Bejat",
      "Silit",
      "Sempak",
      "Fucking",
      "Asshole",
      "Bitch",
      "Penis",
      "Vagina",
      "Klitoris",
      "Kelentit",
      "Borjong",
      "Dancuk",
      "Pantek",
      "Taek",
      "Itil",
      "Teho",
      "Bejat",
      "Pantat",
      "Bagudung",
      "Babami",
      "Kanciang",
      "Bungul",
      "Idiot",
      "Kimak",
      "Henceut",
      "Kacuk",
      "Blowjob",
      "Pussy",
      "Dick",
      "Damn",
      "Ass",
    ];

    const badWord =
      randomBadword[Math.floor(Math.random() * randomBadword.length)];

    if (quoted) {
      return client.sendMessage(
        msg.from,
        {
          text: `Yang *ter-${badWord}* disini adalah @${
            selected.split("@")[0]
          }`,
          mentions: [`${selected}`],
        },
        { quoted }
      );
    } else {
      return client.sendMessage(
        msg.from,
        {
          text: `Yang *ter-${badWord}* disini adalah @${
            selected.split("@")[0]
          }`,
          mentions: [`${selected}`],
        },
        { quoted: message }
      );
    }
  },
};
