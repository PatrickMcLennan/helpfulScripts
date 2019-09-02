# imgNameValidator

Strips a string of anything that will clash with a file systems requirements.

```
const imgNameValidator = require('imgNameValidator');
```

gives you access to the `imgNameValidator()` function.

`imgNameValidator('This would \ not be saved to / the sytem.png )` returns `this-would-not-be-saved-to-the-system.png`.
