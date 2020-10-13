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
  let new_file = `
[<img alt='${name}' src='${img_src}' width=100 align='right'>](${link})
<p align='right'>Today, ${text_month} ${day}, is</p>
<p align='right'><b>${name}</b> <em>(via <a href='https://daysoftheyear.com'>Days of the Year</a>)</em></p>

## :wave: Hello World, I'm Carmela
[<img alt='Shopify logo' src='assets/shopify-logo.png' width=15>](https://www.shopify.com/) Dev Degree Intern @ Shopify || Computer Science Student @ York University [<img alt='York University logo' src='assets/york-logo.jpg' width=15>](https://www.yorku.ca/)

│⠀⠀█⠀⠀█⠀⠀│⠀⠀█⠀⠀█⠀⠀█⠀⠀│⠀⠀█⠀⠀█⠀⠀│⠀⠀█⠀⠀█⠀⠀█⠀⠀│⠀⠀█⠀⠀█⠀⠀│⠀⠀█⠀⠀█⠀⠀█⠀⠀│  ⠀♬⠀⠀⠀⠀⠀
│⠀⠀█⠀⠀█⠀⠀│⠀⠀█⠀⠀█⠀⠀█⠀⠀│⠀⠀█⠀⠀█⠀⠀│⠀⠀█⠀⠀█⠀⠀█⠀⠀│⠀⠀█⠀⠀█⠀⠀│⠀⠀█⠀⠀█⠀⠀█⠀⠀│  ⠀⠀⠀⠀⠀⠀
│⠀⠀█⠀⠀█⠀⠀│⠀⠀█⠀⠀█⠀⠀█⠀⠀│⠀⠀█⠀⠀█⠀⠀│⠀⠀█⠀⠀█⠀⠀█⠀⠀│⠀⠀█⠀⠀█⠀⠀│⠀⠀█⠀⠀█⠀⠀█⠀⠀│  ⠀⠀⠀⠀⠀♪⠀
│⠀⠀⠀│⠀⠀⠀│⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀│  ⠀⠀⠀⠀
│⠀⠀⠀│⠀⠀⠀│⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀│  ⠀⠀♩
│⠀⠀⠀│⠀⠀⠀│⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀⠀│⠀⠀│  ⠀⠀⠀⠀
¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯  ⠀⠀⠀⠀
⠀♬⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀♪♪⠀⠀⠀⠀⠀⠀⠀⠀⠀♩⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀♫♫⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀♬⠀⠀⠀⠀⠀⠀⠀♪♫

* :sparkling_heart: Pronouns: she/her
* :world_map: Based in Canada
* :computer: Currently working on [Shopify CLI](https://github.com/Shopify/shopify-app-cli)
* :seedling: Trying to learn Node, GitHub Actions
* :card_index_dividers: Side projects: both my GitHub READMEs
* :speech_balloon: Interested in robotics, accessibility
* :love_you_gesture: Fun fact: I'm learning ASL

****

[<img align='left' alt='LinkedIn badge' src='https://img.shields.io/badge/-Carmela%20Leung-2867B2?style=for-the-badge&logo=linkedin&link=https://www.linkedin.com/in/carmela-leung-50919b14b/'/>](https://www.linkedin.com/in/carmela-leung-50919b14b/)
[<img align='left' alt='My Other GitHub Badge' src='https://img.shields.io/badge/-carmelore-2b3137?style=for-the-badge&logo=github&link=https://github.com/carmelore'/>](https://github.com/carmelore)
[<img align='left' alt='Facebook Badge' src='https://img.shields.io/badge/-Carmela%20Leung-3b5998?style=for-the-badge&logo=facebook&logoColor=white&link=https://facebook.com/pastelswirlsmusic'/>](https://facebook.com/pastelswirlsmusic) <p align='right'> made with ♥️  + <img alt='JavaScript logo' src='assets/js-logo.png' width=15></p>
  `;

  fs.writeFile('README.md', new_file, function(err) {
    if (err) throw err;
    console.log('ah h  h h h hh h hhh h');
  });
}

generateReadMe();
