import fs from "fs";
import fetch from "node-fetch";

let date = new Date();
let text_month = date.toLocaleString('default', { month: 'long' });
let day = date.getDate();

let name, url, gif_src, giphy_url;

async function getInfo() {
  let log;

  try {
    let request = await fetch('https://www.daysoftheyear.com/api/v1/today?limit=1', {
      headers: {
        'X-Api-Key': '4af1c7e1589ea585b642cc32dffb523f',
      }
    })
    let response = await request.json();

    let holiday = response.data["0"];
    name = holiday.name;
    url = holiday.url;

    log = `${day} ${text_month} ${date.getFullYear}\n${name}: ${url}\n\n`;
  } catch (err) {
    name = 'not a nice day for my code';
    url = 'https://nerdfighteria.info/v/IaPktIpo9_0/';

    log = `ERROR!\n${err}\n\n`;
  };

  console.log(`${name}: ${url}`);

  fs.appendFile('logs.txt', log, function (err) {
    if (err) console.log(err);
  });
}

async function getGif() {
  let params = {
    api_key: "6TqA3QBf0EH7OioSRsslbXfBGvBmE5LR",
    q: name.toLowerCase(),
    rating: "g",
    limit: 1,
  };

  let query = Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");

  try {
    let request = await fetch(`https://api.giphy.com/v1/gifs/search?${query}`);
    let response = await request.json();

    let gif = response.data[0];
    gif_src = gif.embed_url;
    giphy_url = gif.url
  } catch (err) {
    gif_src = 'assets/womp-womp.jpg';
    giphy_url = '#';

    log = `ERROR!\n${err}\n\n`;
  }
}

async function generateReadMe() {
  await getInfo();
  await getGif();

  await fs.readFile('template.txt', 'utf-8', function(err, data) {
    if (err) throw err;
    data = data.replace(/{{name}}/g, name);
    data = data.replace(/{{link}}/g, url);
    data = data.replace(/{{img_src}}/g, gif_src);
    data = data.replace(/{{giphy}}/g, giphy_url);
    data = data.replace(/{{text_month}}/g, text_month);
    let new_readme = data.replace(/{{day}}/g, day);

    fs.writeFile('README.md', new_readme, function(err) {
      if (err) throw err;
    });
  });
}

generateReadMe();
