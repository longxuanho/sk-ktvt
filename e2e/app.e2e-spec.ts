import { SkKtvtPage } from './app.po';

describe('sk-ktvt App', function() {
  let page: SkKtvtPage;

  beforeEach(() => {
    page = new SkKtvtPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
