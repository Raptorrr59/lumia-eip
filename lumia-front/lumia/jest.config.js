module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        // On autorise axios (et d'autres libs ESM si besoin) à être transformées
        '/node_modules/(?!axios)/',
    ],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/src/tests/mocks/fileMock.js',
    },
};
