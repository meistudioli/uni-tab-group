# uni-tab-group

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/uni-tab-group) [![DeepScan grade](https://deepscan.io/api/teams/16372/projects/32031/branches/1040420/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=16372&pid=32031&bid=1040420)

&lt;uni-tab-group /> is a tab component designed to instantly apply uniopen's design elements to any child element assigned with [slot=tab], enabling rapid integration across multiple pages.

![<uni-tab-group />](https://blog.lalacube.com/mei/img/preview/uni-tab-group.png)

## Basic Usage

&lt;uni-tab-group /> is a web component. All we need to do is put the required script into your HTML document. Then follow &lt;uni-tab-group />'s html structure and everything will be all set.

- Required Script

  ```html
  <script
    type="module"
    src="https://unpkg.com/uni-tab-group/mjs/wc-uni-tab-group.js">        
  </script>
  ```

- Structure

  Put &lt;uni-tab-group /> into HTML document. It will have different functions and looks with attribute mutation.
  
  ```html
  <uni-tab-group>
    <a href="#tab1" slot="tab" data-active>tab 1</a>
    <a href="#tab2" slot="tab">tab 2</a>
    <a href="#tab3" slot="tab">tab 3</a>
    <a href="#tab4" slot="tab">tab 4</a>
    <a href="#tab5" slot="tab">tab 5</a>
  </uni-tab-group>
  ```

## JavaScript Instantiation

&lt;uni-tab-group /> could also use JavaScript to create DOM element. Here comes some examples.

```html
<script type="module">
import { UniTabGroup } from 'https://unpkg.com/uni-tab-group/mjs/wc-uni-tab-group.js';

const tabsTemplate = document.querySelector('.my-tabs-template');

// use DOM api
const nodeA = document.createElement('uni-tab-group');
nodeA.appendChild(tabsTemplate.content.cloneNode(true));
document.body.appendChild(nodeA);

// new instance with Class
const nodeB = new UniTabGroup();
nodeB.appendChild(tabsTemplate.content.cloneNode(true));
document.body.appendChild(nodeB);
</script>
```

## Style Customization

Developers could apply styles to decorate &lt;uni-tab-group />'s looking.

```html
<style>
uni-tab-group {
  --uni-tab-group-text-color-normal: var(--ct_text_main_general);
  --uni-tab-group-text-color-hover: var(--ct_text_moderate_subtlest);
  --uni-tab-group-text-color-active: var(--ct_text_inverse_general);

  --uni-tab-group-background-color-normal: transparent;
  --uni-tab-group-background-color-hover: transparent;
  --uni-tab-group-background-color-active: var(--ct_tab-segmented_unit_selected);

  --uni-tab-group-mask-size: 12px;
}
</style>
```

Additionally, a specific tab can be highlighted simply by applying the `data-active` attribute.

```html
<uni-tab-group>
  <a href="#tab1" slot="tab" data-active>tab 1</a>
  <a href="#tab2" slot="tab">tab 2</a>
  <a href="#tab3" slot="tab">tab 3</a>
</uni-tab-group>
```

## Attribute

&lt;uni-tab-group /> component exposes a curated set of attributes, enabling developers to dynamically adjust the user interface. This provides the flexibility to tailor the component’s appearance to seamlessly adapt to any given context.

- **size**

  The size attribute configures the overall dimensions of &lt;uni-tab-group />. The component currently supports three standard options: `large`, `medium`, and `small`, defaulting to `medium`.

  ```html
  <uni-tab-group
    size="medium"
  >
    <a href="#tab1" slot="tab" data-active>tab 1</a>
    <a href="#tab2" slot="tab">tab 2</a>
    <a href="#tab3" slot="tab">tab 3</a>
    <a href="#tab4" slot="tab">tab 4</a>
    <a href="#tab5" slot="tab">tab 5</a>
  </uni-tab-group>
  ```

## Property

| Property Name | Type | Description |
| ----------- | ----------- | ----------- |
| size | String | Getter / Setter size. `size` configures the overall dimensions of &lt;uni-tab-group />. The component currently supports three standard options: `large`, `medium`, and `small`, defaulting to `medium`. |


## Method
| Mathod Signature | Description |
| ----------- | ----------- |
| refresh() | Force a UI refresh on &lt;uni-tab-group />. |

## Reference
- [&lt;uni-tab-group /> demo](https://blog.lalacube.com/mei/webComponent_uni-tab-group.html)
