# fileNameValidator

Strips a string of anything that will clash with a file systems requirements.

```
const fileNameValidator = require('fileNameValidator');
```

gives you access to the `fileNameValidator()` function.

`fileNameValidator('This would \ not be saved to / the sytem.png)` returns `this-would-not-be-saved-to-the-system.png`.
