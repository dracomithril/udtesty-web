import * as database from '.';

describe('database', () => {
  it('should be able to obtain list of questions',
    () => database.getQuestions('test1')
      .then((questions) => {
        expect(questions).toHaveLength(3);
      }));

  it('should obtain list of tests', () => {
    database.getTests().then((tests) => {
      expect(tests).toHaveLength(2);
    });
  });
});
