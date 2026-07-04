import { _wcl } from 'https://unpkg.com/uni-input-field/mjs/common-lib.js';
import { _wccss } from 'https://unpkg.com/uni-input-field/mjs/common-css.js';
import {
  colorPalette as _uniColorPalette
} from 'https://unpkg.com/uni-input-field/mjs/uni-css.js';

const defaults = {
  size: 'medium' // large, medium, small
};
const booleanAttrs = [];
const objectAttrs = [];
const custumEvents = {};

const template = document.createElement('template');
template.innerHTML = `
<style>
${_wccss}
${_uniColorPalette}


:host {
  --mask-size: var(--uni-tab-group-mask-size, 12px);

  --mask-image-start: linear-gradient(
    to right,
    transparent 0%,
    black 0%,
    black calc(100% - var(--mask-size)),
    transparent 100%
  );
  --mask-image-process: linear-gradient(
    to right,
    transparent 0%,
    black var(--mask-size),
    black calc(100% - var(--mask-size)),
    transparent 100%
  );
  --mask-image-end: linear-gradient(
    to right,
    transparent 0%,
    black var(--mask-size),
    black 100%,
    transparent 100%
  );

  position: relative;
  inline-size: 100%;
  display: block;
  outline: 0 none;
  border: 0 none;
  box-sizing: border-box;
  overflow: hidden;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;

  /* force hide scroll */
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @supports (animation-timeline: scroll()) {
    animation: adjust-mask auto linear forwards;
    animation-timeline: scroll(self inline);
  }
}

@keyframes adjust-mask {
  0% {
    mask-image: var(--mask-image-start);
    -webkit-mask-image: var(--mask-image-start);
  }

  1%, 99% {
    mask-image: var(--mask-image-process);
    -webkit-mask-image: var(--mask-image-process);
  }

  100% {
    mask-image: var(--mask-image-end);
    -webkit-mask-image: var(--mask-image-end);
  }
}

:host([hidden]) {
  display: none;
}

:host([size=large]) {
  .main {
    --font-size: var(--large-font-size);
    --block-size: var(--large-block-size);
    --border-radius: var(--large-border-radius); 
    --padding-inline: var(--large-padding-inline);
  }
}

:host([size=medium]) {
  .main {
    --font-size: var(--medium-font-size);
    --block-size: var(--medium-block-size);
    --border-radius: var(--medium-border-radius); 
    --padding-inline: var(--medium-padding-inline);
  }
}

:host([size=small]) {
  .main {
    --font-size: var(--small-font-size);
    --block-size: var(--small-block-size);
    --border-radius: var(--small-border-radius); 
    --padding-inline: var(--small-padding-inline);
  }
}

.main {
  --text-color-normal: var(--uni-tab-group-text-color-normal, var(--ct_text_main_general));
  --text-color-hover: var(--uni-tab-group-text-color-hover, var(--ct_text_moderate_subtlest));
  --text-color-active: var(--uni-tab-group-text-color-active, var(--ct_text_inverse_general));
  --text-color: var(--text-color-normal);

  --background-color-normal: var(--uni-tab-group-background-color-normal, transparent);
  --background-color-hover: var(--uni-tab-group-background-color-hover, transparent);
  --background-color-active: var(--uni-tab-group-background-color-active, var(--ct_tab-segmented_unit_selected));
  --background-color: var(--background-color-normal);

  /* size */
  --large-font-size: 20px;
  --large-block-size: 56px;
  --large-border-radius: 12px;
  --large-padding-inline: 32px;

  --medium-font-size: 16px;
  --medium-block-size: 48px;
  --medium-border-radius: 12px;
  --medium-padding-inline: 32px;

  --small-font-size: 14px;
  --small-block-size: 40px;
  --small-border-radius: 12px;
  --small-padding-inline: 24px;

  inline-size: fit-content;

  /* default setting */
  --font-size: var(--medium-font-size);
  --block-size: var(--medium-block-size);
  --border-radius: var(--medium-border-radius); 
  --padding-inline: var(--medium-padding-inline);

  [name=tab] {
    display: flex;
  }

  ::slotted(:nth-child(1 of [slot=tab][data-active])) {
    --text-color: var(--text-color-active);
    --background-color: var(--background-color-active);
  }

  ::slotted([slot=tab]:focus-visible) {
    --text-color: var(--text-color-hover);
  }

  @media (hover: hover) {
    ::slotted([slot=tab]:not([data-active]):hover) {
      --text-color: var(--text-color-hover);
      --background-color: var(--background-color-hover);
    }
  }
}
</style>

<div class="main" ontouchstart="">
  <slot name="tab"></slot>
</div>
`;

/* style injection */
const styleInjection = `
uni-tab-group [slot=tab] {
  outline: 0 none;
  appearance: none;
  box-shadow: none;

  font-size: var(--font-size);
  font-weight: 400;
  color: var(--text-color);
  display: flex;
  align-items: center;
  flex-shrink: 0;

  inline-size: fit-content;
  block-size: var(--block-size);
  border-radius: var(--border-radius);
  
  background: var(--background-color);
  padding-block: 0;
  padding-inline: var(--padding-inline);
  margin: 0;

  transition:
    color .15s ease,
    background-color .15s ease
  ;
}
`;

const INJECT_KEY = Symbol.for('uni.tab.group.ui.injected');
const uiInit = () => {
  if (window[INJECT_KEY]) {
    return;
  }

  const sheet = new CSSStyleSheet();
  sheet.replaceSync(styleInjection);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

  window[INJECT_KEY] = true;
};
uiInit();

export class UniTabGroup extends HTMLElement {
  #data;
  #nodes;
  #config;

  constructor(config) {
    super();

    // template
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // data
    this.#data = {
      controller: '',
    };

    // nodes
    this.#nodes = {};

    // config
    this.#config = {
      ...defaults,
      ...config // new UniTabGroup(config)
    };
  }

  async connectedCallback() {
    const { config, error } = await _wcl.getWCConfig(this);

    if (error) {
      console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${error}`);
      this.remove();
      return;
    } else {
      this.#config = {
        ...this.#config,
        ...config
      };
    }

    // upgradeProperty
    Object.keys(defaults).forEach((key) => this.#upgradeProperty(key));
  }

  disconnectedCallback() {
    this.#data.controller.abort?.();
  }

  #format(attrName, oldValue, newValue) {
    const hasValue = newValue !== null;

    if (!hasValue) {
      if (booleanAttrs.includes(attrName)) {
        this.#config[attrName] = false;
      } else {
        this.#config[attrName] = defaults[attrName];
      }
    } else {
      switch (attrName) {
        case 'size': {
          this.#config[attrName] = ['large', 'medium', 'small'].includes(newValue) ? newValue : defaults.size;
          break;
        }
      }
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (!UniTabGroup.observedAttributes.includes(attrName)) {
      return;
    }

    this.#format(attrName, oldValue, newValue);
  }

  static get observedAttributes() {
    return Object.keys(defaults); // UniTabGroup.observedAttributes
  }

  static get supportedEvents() {
    return Object.keys(custumEvents).map(
      (key) => {
        return custumEvents[key];
      }
    );
  }

  #upgradeProperty(prop) {
    let value;

    if (UniTabGroup.observedAttributes.includes(prop)) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        value = this[prop];
        delete this[prop];
      } else {
        if (booleanAttrs.includes(prop)) {
          value = (this.hasAttribute(prop) || this.#config[prop]) ? true : false;
        } else if (objectAttrs.includes(prop)) {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : JSON.stringify(this.#config[prop]);
        } else {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : this.#config[prop];
        }
      }

      this[prop] = value;
    }
  }

  set size(value) {
    if (value) {
      this.setAttribute('size', value);
    } else {
      this.removeAttribute('size');
    }
  }

  get size() {
    return this.#config.size;
  }

  refresh() {
    this.hidden = true;
    this.offsetHeight;
    this.hidden = false;
  }
}

// define web component
const S = _wcl.supports();
const T = _wcl.classToTagName('UniTabGroup');
if (S.customElements && S.shadowDOM && S.template && !window.customElements.get(T)) {
  window.customElements.define(_wcl.classToTagName('UniTabGroup'), UniTabGroup);
}