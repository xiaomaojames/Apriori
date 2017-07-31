import { AnylizeRelationPage } from './app.po';

describe('anylize-relation App', () => {
  let page: AnylizeRelationPage;

  beforeEach(() => {
    page = new AnylizeRelationPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
