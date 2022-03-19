import { join } from 'path';

export class SetViewEngineHbs {
  constructor(app) {
    app.useStaticAssets(join(__dirname, '../src/views', 'public'));
    app.setBaseViewsDir(join(__dirname, '../src/', 'views'));
    app.setViewEngine('hbs');
  }
}
