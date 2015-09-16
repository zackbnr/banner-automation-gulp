# Banner Automation
An internal tool for optimizing, packaging up, and previewing banners.

## Setup Instructions
1. Install `node`
2. Install `gulp` globally
3. Clone this repository to your computer
4. Add banners in their own folders in `public` (see cat & dog example)
5. Update the `banners.json` file with the relevant information (see cat & dog example)
6. To start the preview page as a server, run `node app.js`
7. To package up the applications, run `gulp`

**NOTE**: The project name is hard-coded (for the moment) in `gulpfile.js`. This controls the name of the clicktag and will also need to be updated.

## Stack
- node
- gulp

## Development ToDo
- ~~Get gulp running / set up repository~~
- ~~Remove the unused images in a project~~
- Trow an error if missing a backup image
- Update the HTML file
    - ~~Enabler file~~
    - ~~Wrap the banner in a click tag (styled)~~
    - ~~Add the dimensional meta tag~~
    - ~~Remove `http:` from any urls (except enabler)~~
    - _Optional:_ Add a border with css (needs thought)
- ~~Abstract updates to work with a set of files~~
- ~~Read in a JSON file (the same that builds the preview)~~
- ~~Zip the banners individually~~
- Throw a warning if some banners are too big (and break flow)
- Zip the entire project
- Create a recap report
- ~~Connect the preview page~~
- Deep link preview page

## Nice to Have
- PNG image optimization
- JPG image optimization
- Ability to set the file size requirement
- Ability to toggle features (for non-edge builds)
