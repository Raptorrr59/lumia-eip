import React from 'react';

// Créer un composant qui transmet tous les événements et props
const createComponent = (type) => {
  return React.forwardRef(({ children, ...props }, ref) => {
    // Filtrer les props d'animation
    const animationProps = [
      'initial', 'animate', 'exit', 'transition', 
      'whileHover', 'whileTap', 'whileInView', 'whileFocus', 'whileDrag',
      'variants', 'viewport', 'transformTemplate', 'transformValues',
      'onAnimationStart', 'onAnimationComplete', 'onUpdate', 'onDragStart',
      'onDrag', 'onDragEnd', 'onDirectionLock', 'onDragTransitionEnd',
      'drag', 'dragConstraints', 'dragElastic', 'dragMomentum', 'dragPropagation',
      'dragTransition', 'layout', 'layoutId', 'layoutDependency', 'layoutScroll',
      'style' // Filtrer style pour éviter les conflits avec les transformations
    ];
    
    // Conserver les gestionnaires d'événements et autres props importantes
    const filteredProps = {};
    
    // Copier toutes les props qui ne sont pas des props d'animation
    Object.keys(props).forEach(key => {
      if (!animationProps.includes(key)) {
        filteredProps[key] = props[key];
      }
    });
    
    // Ajouter la ref si elle existe
    if (ref) {
      filteredProps.ref = ref;
    }
    
    return React.createElement(type, filteredProps, children);
  });
};

// Créer un proxy pour les composants motion
const motionComponents = new Proxy({}, {
  get: (target, prop) => {
    return createComponent(prop);
  }
});

// Mock pour framer-motion
const framerMotionMock = {
  motion: motionComponents,
  AnimatePresence: ({ children }) => <>{children}</>,
  useAnimation: () => ({ 
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn()
  }),
  useInView: () => [React.createRef(), true],
  useScroll: () => ({ 
    scrollYProgress: { 
      onChange: jest.fn(),
      current: 0,
      get: () => 0
    },
    scrollY: {
      onChange: jest.fn(),
      current: 0,
      get: () => 0
    }
  }),
  useTransform: () => ({
    onChange: jest.fn(),
    current: 0,
    get: () => 0
  }),
  useSpring: () => ({
    onChange: jest.fn(),
    current: 0,
    get: () => 0
  }),
  useMotionValue: () => ({
    onChange: jest.fn(),
    current: 0,
    get: () => 0,
    set: jest.fn()
  })
};

module.exports = framerMotionMock;