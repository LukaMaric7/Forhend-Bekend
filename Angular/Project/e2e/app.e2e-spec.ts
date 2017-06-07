import { ProjectPage } from './app.po';

describe('project App', () => {
  let page: ProjectPage;

  beforeEach(() => {
    page = new ProjectPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
