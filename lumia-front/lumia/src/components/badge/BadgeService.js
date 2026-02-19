import axios from 'axios';

/**
 * Get all badges for a specific user
 * @param {string} userId - The ID of the user
 * @returns {Promise<Array>} Array of user badges
 */
export const getUserBadges = async (userId) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    console.log("AccessToken (badges) : ", token)

    const response = await axios.get(`/api/${userId}/badges`, {
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user badges:', error);
    throw error;
  }
};

/**
 * Add a badge to a user
 * @param {string} userId - The ID of the user
 * @param {string} badgeName - The name of the badge to add (BEGINNER, INTERMEDIATE, EXPERT, BETA)
 * @returns {Promise<Object>} Response from the server
 */
export const addBadgeToUser = async (userId, badgeName) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await axios.post(`/api/user/${userId}/badges`, {
      badgeName: badgeName
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error adding badge to user:', error);
    throw error;
  }
};

/**
 * Check if a user has a specific badge
 * @param {string} userId - The ID of the user
 * @param {string} badgeName - The name of the badge to check
 * @returns {Promise<boolean>} True if user has the badge, false otherwise
 */
export const checkUserHasBadge = async (userId, badgeName) => {
  try {
    const userBadges = await getUserBadges(userId);
    return userBadges.some(badge => badge.badgeName === badgeName);
  } catch (error) {
    console.error('Error checking user badge:', error);
    return false;
  }
};

/**
 * Get badge display information for UI rendering
 * @param {string} badgeName - The name of the badge
 * @returns {Object} Badge display information (name, picture, color)
 */
export const getBadgeDisplayInfo = (badgeName) => {
  const badgeMap = {
    'BEGINNER': {
      name: 'Beginner',
      picture: '/images/badges/beginner.png',
      color: '#10B981'
    },
    'INTERMEDIATE': {
      name: 'Intermédiaire', 
      picture: '/images/badges/intermediate.png',
      color: '#F59E0B'
    },
    'EXPERT': {
      name: 'Expert',
      picture: '/images/badges/expert.png', 
      color: '#EF4444'
    },
    'BETA': {
      name: 'Bêta Test',
      picture: '/images/badges/beta.png',
      color: '#8B5CF6'
    }
  };
  
  return badgeMap[badgeName] || {
    name: badgeName,
    picture: '/images/badges/default.png',
    color: '#6B7280'
  };
};

/**
 * Badge name constants for easy reference
 */
export const BadgeName = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE', 
  EXPERT: 'EXPERT',
  BETA: 'BETA'
};