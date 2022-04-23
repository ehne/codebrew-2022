const fs = require('fs');
const {join} = require('path');


module.exports = async (_, res) => {
  const filePath = join(__dirname, 'jsonfiletext.json');
  const fileData = JSON.parse(fs.readFileSync(filePath));

  const products = Object.keys(fileData).map(key => ({
    label: key,
    id: encodeURIComponent(key)
  }))

  res.json(products)
}