const fs = require('fs');
const request = require('request-promise');

const NAME_REGEX = /<a href="https:\/\/www\.daysoftheyear\.com\/days\/([a-z]|-)+\/" class="js-link-target">(\w|\s|-|')+<\/a>/g;
const IMAGE_REGEX = /https:\/\/www\.daysoftheyear\.com\/cdn-cgi\/image\/([a-z]|\d|=|,)+\/wp-content\/uploads\/([a-z]|-|\d)+\.[a-z]+/g;

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let text_month = date.toLocaleString('default', { month: 'long' });
let day = date.getDate();
let url = `https://www.daysoftheyear.com/days/${year}/${month}/${day}/`;

let name, link, img_src;

async function getInfo() {
  await request(url)
    .then(function(html) {
      let result = html.match(NAME_REGEX);
      let holiday = result[0];
      name = holiday.split(/<|>/)[2];
      link = holiday.split(/"/)[1];

      result = html.match(IMAGE_REGEX);
      img_src = result[2];
    })
    .catch(function(err) {
      name = 'not a nice day for my code';
      link = 'https://www.youtube.com/watch?v=ign_vZupjno';
      img_src = 'assets/womp-womp.jpg';
    });

  console.log(`${name}: ${link}`);
  console.log(img_src);
}

async function generateReadMe() {
  await getInfo(url);

  await fs.readFile('template.txt', 'utf-8', function(err, data) {
    if (err) throw err;
    data = data.replace(/{{name}}/g, name);
    data = data.replace(/{{link}}/g, link);
    data = data.replace(/{{img_src}}/g, img_src);
    data = data.replace(/{{text_month}}/g, text_month);
    let new_readme = data.replace(/{{day}}/g, day);

    fs.writeFile('README.md', new_readme, function(err) {
      if (err) throw err;
      console.log('ah h  h h h hh h hhh h');
    });
  });
}

generateReadMe();
