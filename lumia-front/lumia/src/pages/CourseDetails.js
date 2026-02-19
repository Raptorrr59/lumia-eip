useEffect(() => {
  const checkCourseCompletion = async () => {
    const userId = localStorage.getItem('id');
    const accessToken = localStorage.getItem('accessToken');
    
    if (userId && accessToken) {
      try {
        const response = await axios.get(`/api/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        // Chercher si ce cours est complété dans les données utilisateur
        const userProgress = response.data;
        let courseCompleted = false;
        
        userProgress.forEach(progress => {
          if (progress.completedCourses && progress.completedCourses.includes(parseInt(id))) {
            courseCompleted = true;
          }
        });
        
        setIsCompleted(courseCompleted);
      } catch (error) {
        console.error('Error checking course completion:', error);
      }
    }
  };
  
  checkCourseCompletion();
}, [id]);

const handleCompleteCourse = async () => {
  const userId = localStorage.getItem('id');
  const accessToken = localStorage.getItem('accessToken');
  
  if (userId && accessToken) {
    try {
      await axios.post('/api/complete-course', {
        id: `${userId}_course_${id}`,
        userId: userId,
        moduleId: 0, // Pour un cours individuel
        completedCourses: [parseInt(id)],
        moduleCompleted: false
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      setIsCompleted(true);
      console.log('Course marked as completed');
    } catch (error) {
      console.error('Error completing course:', error);
    }
  }
};