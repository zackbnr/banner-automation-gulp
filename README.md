# Banner Automation
An internal tool for optimizing, packaging up, and previewing banners.

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
    - Remove `http:` from any urls (except enabler)
    - _Optional:_ Add a border with css (needs thought)
- ~~Abstract updates to work with a set of files~~
- ~~Read in a JSON file (the same that builds the preview)~~
- Zip the banners individually
- Throw a warning if some banners are too big (and break flow)
- Zip the entire project
- Create a recap report
- Connect the preview page

## Nice to Have
- PNG image optimization
- JPG image optimization
- Ability to set the file size requirement
- Ability to toggle features (for non-edge builds)
