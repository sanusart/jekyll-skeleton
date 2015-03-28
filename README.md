# jekyll skeleton

jekyll + gulp + sass + bower + browsersync skeleton



### Depends on:

 - jekyll
 - nodejs
 - npm

### Running:

- `bundle install` - to install jekyll and it's dependencies
- `npm install` - to install dependencies (runs `bower install` via postinstall script)
- `gulp` - to run the site with browserSync (will open http://localhost:3000)

### Deploy

- `gulp release --min` - generate `_site` dir, minify files, runs the site with browserSync (will open http://localhost:3000) - it is basically for release and preview
- Commit and push changes (to `src` branch)
- `npm run site-deploy` - will deploy content of generated `_site` with git subtree to `gh-pages` branch

### Include bower assets in `gulpfile.js`:

- **css**: in array named `css_files`
- **js**: in array named `js_files`
- **fonts**: in array named `font_files`

### Srtructure

```
.
├── bower.json
├── _config.build.yml
├── _config.yml
├── Gemfile
├── gulpfile.js
├── package.json
├── README.md
├── _site
│   └── [ this is the disttribution directory ]
└── src
    ├── _layouts
    ├── _pages
    ├── _posts
    ├── _includes
    ├── css
    ├── js
    ├── lib
    │    └── [ this is where bower will download assets ]
    ├── fonts
    ├── images
    ├── robots.txt
    ├── crossdomain.xml
    ├── atom.xml
    └── README.md

```