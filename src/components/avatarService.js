import axios from 'axios';

export const fetchAvatar = async (gender) => {
  try {
    let url = 'https://avatar.iran.liara.run/public';
    if (gender?.toLowerCase() === 'female') {
      url = 'https://avatar.iran.liara.run/public/girl';
    } else if (gender?.toLowerCase() === 'male') {
      url = 'https://avatar.iran.liara.run/public/boy';
    }

    const response = await axios.get(url, { responseType: 'blob' });
    const avatarUrl = URL.createObjectURL(response.data);
    return avatarUrl; // Return the generated URL for React to use
  } catch (error) {
    console.error('Failed to fetch avatar:', error.message);
    return 'https://via.placeholder.com/150'; // Fallback placeholder
  }
};
