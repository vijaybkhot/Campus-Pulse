import fs from 'fs';
import axios from 'axios';

const fetchAvatar = async (gender) => {
  try {
    let url = 'https://avatar.iran.liara.run/public';
    if (gender?.toLowerCase() === 'female') {
      url = 'https://avatar.iran.liara.run/public/girl';
    } else if (gender?.toLowerCase() === 'male') {
      url = 'https://avatar.iran.liara.run/public/boy';
    }

    console.log(`Fetching avatar for ${gender || 'random'}: ${url}`);
    
    const response = await axios.get(url, { responseType: 'stream' });

    // Save the fetched avatar as a file
    const filePath = `./avatar_${gender || 'random'}.png`;
    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    writer.on('finish', () => {
      console.log(`Avatar saved to ${filePath}`);
    });

    writer.on('error', (err) => {
      console.error('Failed to write file:', err);
    });
  } catch (error) {
    console.error('Failed to fetch avatar:', error.message);
  }
};

// Test the function with different genders
(async () => {
  await fetchAvatar('male');
  await fetchAvatar('female');
  await fetchAvatar();
})();
