# plugin

Import:

```javascript
import Vue from 'vue'
import VuePopover from 'VuePopover'

Vue.use(VuePopover)
```

Usage:

```vue
<VuePopover name="myPopover">
  Content...
</VuePopover>

<button v-popover:myPopover>Toggle popover</button>
```

Props:

| Name       | Type                   | Required | Description                                                       |
| ---------- | ---------------------- | -------- | ----------------------------------------------------------------- |
| name       | String                 | true     | Binding popover with caller                                       |
| placement  | String                 | false    | Setting position of the popover: 'left', 'right', 'top', 'bottom' |
| offset     | Number                 | false    | Setting padding px from the element                               |


# Demo

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
