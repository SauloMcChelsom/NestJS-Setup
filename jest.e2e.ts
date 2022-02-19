export default {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  moduleNameMapper: {




    '^@root/(.*)$': '<rootDir>/$1',
    '^@modules/(.*)$': '<rootDir>src/modules/$1',
    '^@conf/(.*)$': '<rootDir>src/conf/$1',
    '^@lib/(.*)$': '<rootDir>src/lib/$1',
    '^@entity/(.*)$': '<rootDir>src/entity/$1',
    '^@views/(.*)$': '<rootDir>src/views/$1',
  },
}
