const [completedCourses, setCompletedCourses] = useState([]);

useEffect(() => {
  const loadCompletedCourses = async () => {
    const userId = localStorage.getItem('id');
    const accessToken = localStorage.getItem('accessToken');
    
    if (userId && accessToken) {
      try {
        const response = await axios.get(`/api/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        const userProgress = response.data;
        const moduleProgress = userProgress.find(progress => progress.moduleId === formation.id);
        
        if (moduleProgress && moduleProgress.completedCourses) {
          setCompletedCourses(moduleProgress.completedCourses);
        }
      } catch (error) {
        console.error('Error loading completed courses:', error);
        // Fallback vers localStorage
        const savedProgress = localStorage.getItem(`formation_${formation.id}_progress`);
        if (savedProgress) {
          setCompletedCourses(JSON.parse(savedProgress));
        }
      }
    }
  };
  
  loadCompletedCourses();
  
  // Recharger quand on revient sur la page
  const handleFocus = () => {
    loadCompletedCourses();
  };
  
  window.addEventListener('focus', handleFocus);
  return () => window.removeEventListener('focus', handleFocus);
}, [formation.id]);