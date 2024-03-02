# Code Samples

~~~python
# python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print i
~~~

```cpp
// cpp
for (int i = 0; i < 0; ++i) {
  int a = 0;
  char x = "a";
}
```

```java
// java
for (int i = 0; i < 0; ++i) {
  int a = 0;
  String x = "a";
}
```

```javascript
// javascript
import thing from 'thing'
import component from 'component.js'

const md = thing({
  attribute: function (str, key) {
    if (key && compononent.getValue(key)) {
      try {
        return component.compute(str, { key: key }).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});
```

```bash
# bash
./script.sh <input1> <input2>
```