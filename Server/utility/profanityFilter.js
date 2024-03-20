import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, '../data/curseWords.json');
let curseWords; 
try {
    const curseWordsData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(curseWordsData);
    curseWords = jsonData.records.map(entry => entry.word);
    // console.log('Curse words:', curseWords);
  } catch (error) {
    console.error('Error reading curse words file:', error);
    // Handle the error gracefully, such as using a default list of curse words
}

// Define profanity filter function
function filterProfanity(text, curseWords) {

    if( text === undefined) return;
    // Iterate over curse words and replace them with ***
    // console.log('Curse words received:', curseWords);
    curseWords.forEach(curseWord => {
      const regex = new RegExp('\\b' + curseWord + '\\b', 'gi'); // 'gi' flag for case-insensitive search
      text = text.replace(regex, '***');
    });
    return text;
}


  export { filterProfanity };
  export { curseWords };