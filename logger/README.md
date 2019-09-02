# logger

```
const logger = require('path/to/logger.js)
```

gives you `logger(stringYouWishToLog, directory)`. Scans `directory` for a `logs.txt` file - if it exists, appends `stringYouWishToLog` its end, if not it creates + writes to it.
