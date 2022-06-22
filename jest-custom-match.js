expect.extend({
    toBeWithinRange(received, floor, ceiling) {
      const pass = received >= floor && received <= ceiling;
      if (pass) {
        return {
          message: () =>
            `expected ${received} not to be within range ${floor} - ${ceiling}`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${received} to be within range ${floor} - ${ceiling}`,
          pass: false,
        };
      }
    },
    isNumber(received) {
      const pass = typeof received == 'number'
      if (pass) {
        return {
          message: () =>
            `expected ${received} not to be number`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${received} to be number`,
          pass: false,
        };
      }
    },
    isStrings(received) {
      const pass = typeof received == 'string'
      if (pass) {
        return {
          message: () =>
            `expected ${received} not to be string`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${received} to be string`,
          pass: false,
        };
      }
    },
    isDataTime(received) {
      const pass = typeof received == 'object'
      if (pass) {
        return {
          message: () =>
            `expected ${received} not to be DataTime`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${received} to be DataTime`,
          pass: false,
        };
      }
    },
    isTrue(received) {
      const pass = typeof received == 'boolean'
      if (pass == true) {
        return {
          message: () =>
            `expected ${received} not to be true`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${received} to be true`,
          pass: false,
        };
      }
    },
  });