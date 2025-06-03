exports.exportToCSV = async () => {
  try {
    const users = await User.findAll({ raw: true }); // fetch raw data

    const json2csvParser = new Parser(); // you can specify fields: new Parser({ fields: ['name', 'email', 'age'] })
    const csv = json2csvParser.parse(users);

    fs.writeFileSync("users.csv", csv);
    console.log("Exported to users.csv");
  } catch (error) {
    console.error("Error exporting data:", error);
  }
};