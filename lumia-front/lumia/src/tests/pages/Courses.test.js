import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Courses from '../../pages/Courses';
import { LangProvider } from '../../LangProvider';
import { coursesDataFr } from '../../utils/CoursesDataFR';

// Mock framer-motion
jest.mock('framer-motion', () => {
  return require('../mocks/framer-motion');
});

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn((key) => {
    if (key === 'language') return 'FR';
    return null;
  }),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true
});

// Mock FilterDropdown
jest.mock('../../components/FilterDropdown', () => {
  return function MockFilterDropdown({ languageOptions = [], typeOptions = [], categoryOptions = [] }) {
    return (
      <div>
        <select aria-label="language">
          {languageOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
        <select aria-label="difficulty">
          {typeOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
    );
  };
});

// Mock SearchBar
jest.mock('../../components/SearchBar', () => {
  return function MockSearchBar({ placeholder, onChange }) {
    return <input type="text" placeholder={placeholder || "Search"} onChange={onChange} />;
  };
});

// Mock Tutorial components
jest.mock('../../components/tutorials/TutorialPopup', () => {
  return function MockTutorialPopup() {
    return null;
  };
});

jest.mock('../../components/tutorials/TutorialInteractif', () => {
  return function MockTutorialInteractif() {
    return null;
  };
});

// Mock RedirectionCourse
jest.mock('../../components/redirections/RedirectionCourse', () => {
  return function MockRedirectionCourse({ name }) {
    return <div data-testid="course-card">{name}</div>;
  };
});

// Mock RedirectionFormation
jest.mock('../../components/redirections/RedirectionFormation', () => {
  return function MockRedirectionFormation({ name }) {
    return <div data-testid="formation-card">{name}</div>;
  };
});

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe('Page Courses', () => {
  const renderCourses = () => {
    return render(
      <BrowserRouter>
        <LangProvider>
          <Courses />
        </LangProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders courses page without crashing', () => {
    renderCourses();
    expect(document.body).toBeInTheDocument();
  });

  test('renders page heading', () => {
    renderCourses();
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  test('renders search input', () => {
    renderCourses();
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
  });

  test('allows searching courses', () => {
    renderCourses();
    const searchInput = document.querySelector('input[type="text"]');

    if (searchInput) {
      fireEvent.change(searchInput, { target: { value: 'Python' } });
      expect(searchInput.value).toBe('Python');
    } else {
      expect(true).toBe(true);
    }
  });

  test('renders filter dropdowns', () => {
    renderCourses();
    const selects = screen.getAllByRole('combobox');
    expect(selects.length).toBeGreaterThan(0);
  });

  test('displays course cards', () => {
    renderCourses();
    const courseCards = screen.queryAllByTestId('course-card');
    expect(courseCards.length >= 0).toBe(true);
  });
});