Scrapes Reddit, gathers images, checks for duplicates within your Directory, downloads images if not found. Primarily built for r/WidescreenWallpaper, but should work for any subreddit made for images.

Takes 2 arguments - one for the subreddit to scrape, another for the directory to check for duplicates + download destination.

Ex.

    node/bash/python3 .redditScraper.js/sh/py widescreenwallpaper $(pwd)
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    Scrapes r/widescreenwallpaper for posts, checks post titles against picture names in current directory, navigates to each images source + downloads if not found.
