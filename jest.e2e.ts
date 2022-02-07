export default {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "__tests__",
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}
