# scrape-nasa-3d-models
A little repo to fetch the NASA 3D models and download 'em all

## What's this?

The NASA has a page with a bunch of 3D models available on their website: https://nasa3d.arc.nasa.gov/models
I used the browser to fetch those into a [JSON array](model-urls.json) by running the following snippet:

```javascript
JSON.stringify($$(".block-grid-item.block-grid-border > a").map(x => x.href))
```

Then I fed that list into [index.js](index.js) which downloads all those models.
Now I've got 1.5 GB of NASA 3D models... let's see what we can do with this :)
