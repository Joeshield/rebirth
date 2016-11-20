import { browser, element, by } from 'protractor';
import { PageBase } from '../../utils';
import { promise as wdpromise, WebElement } from 'selenium-webdriver';

export interface Article {
  title: wdpromise.Promise<string>,
  author: wdpromise.Promise<string>,
  date: wdpromise.Promise<string>,
  tags: any,
}

export class RebirthHomePage extends PageBase {

  constructor() {
    super('/blog/home');
  }

  getLogo() {
    return element(by.className('logo')).getAttribute('alt');
  }

  getNavs(): wdpromise.Promise<string[]> {
    return element.all(by.css('[routerlinkactive]'))
      .map(element => element.getText().then(text => text.replace(/\s/g, '|')));
  }

  getNavsWithSiteResource(): wdpromise.Promise<string[]> {
    element(by.linkText('站内资源')).click();
    return this.getNavs();
  }

  getArticleItems(): wdpromise.Promise<Article[]> {
    return element.all(by.tagName('article-item'))
      .map(element => <Article>{
        title: element.element(by.className('article-title')).getText(),
        author: element.element(by.className('article-author')).getText(),
        date: element.element(by.className('article-date')).getText(),
        tags: element.all(by.className('article-tag-list-item'))
          .map(tag => tag.getText())
      })
  }
}