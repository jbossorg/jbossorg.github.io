import PFElement from '../../pfelement/dist/pfelement.js';

// @POLYFILL  Element.matches
// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

// @POLYFILL  Element.closest
// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

// @POLYFILL  Array.includes
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, "includes", {
    value: function(valueToFind, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return (
          x === y ||
          (typeof x === "number" &&
            typeof y === "number" &&
            isNaN(x) &&
            isNaN(y))
        );
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(valueToFind, elementK) is true, return true.
        if (sameValueZero(o[k], valueToFind)) {
          return true;
        }
        // c. Increase k by 1.
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}

/*!
 * PatternFly Elements: PfeCard 1.0.0-prerelease.55
 * @license
 * Copyright 2020 Red Hat, Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
*/

class PfeCard extends PFElement {
  static get version() {
    return "1.0.0-prerelease.55";
  }

  get html() {
    return `<style>@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([pfe-color=accent]),:host([pfe-color=base]),:host([pfe-color=complement]),:host([pfe-color=darker]),:host([pfe-color=darkest]),:host([pfe-color=lightest]){background-color:#fff!important;color:#151515!important}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#151515!important}}:host{--theme:var(--pfe-card--theme, var(--pfe-theme--color--surface--base--theme, light));display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;justify-items:flex-start;-webkit-align-self:stretch;-ms-flex-item-align:stretch;-ms-grid-row-align:stretch;align-self:stretch;padding:calc(16px * 2) calc(16px * 2) calc(16px * 2) calc(16px * 2);padding:var(--pfe-card--Padding,var(--pfe-card--PaddingTop,calc(var(--pfe-theme--container-spacer,16px) * 2)) var(--pfe-card--PaddingRight,calc(var(--pfe-theme--container-spacer,16px) * 2)) var(--pfe-card--PaddingBottom,calc(var(--pfe-theme--container-spacer,16px) * 2)) var(--pfe-card--PaddingLeft,calc(var(--pfe-theme--container-spacer,16px) * 2)));border:0 solid #d2d2d2;border:var(--pfe-card--Border,var(--pfe-card--BorderWidth,0) var(--pfe-card--BorderStyle,solid) var(--pfe-card--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2)));border-radius:3px;border-radius:var(--pfe-card--BorderRadius,var(--pfe-theme--surface--border-radius,3px));overflow:hidden;background-color:#f0f0f0;background-color:var(--pfe-card--BackgroundColor,var(--pfe-theme--color--surface--base,#f0f0f0));background-position:center center;background-position:var(--pfe-card--BackgroundPosition,center center);color:#3c3f42;color:var(--pfe-broadcasted--text,#3c3f42)}@media print{:host{background-color:#fff!important;background-image:none!important;-webkit-box-shadow:none!important;box-shadow:none!important}}@media print{:host{border-radius:3px;border:1px solid #d2d2d2}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{background-color:#fff!important;background-color:var(--pfe-theme--color--surface--lightest,#fff)!important;color:#151515!important;color:var(--pfe-theme--color--text,#151515)!important;background-image:none!important;border-radius:3px;border:1px solid #d2d2d2;padding:16px;padding:var(--pfe-theme--container-spacer,16px)}}:host([pfe-color=darker]){--pfe-card--BackgroundColor:var(--pfe-theme--color--surface--darker, #3c3f42);--pfe-card--theme:var(--pfe-theme--color--surface--darker--theme, dark)}:host([pfe-color=darkest]){--pfe-card--BackgroundColor:var(--pfe-theme--color--surface--darkest, #151515);--pfe-card--theme:var(--pfe-theme--color--surface--darkest--theme, dark)}:host([pfe-color=base]){--pfe-card--BackgroundColor:var(--pfe-theme--color--surface--base, #f0f0f0);--pfe-card--theme:var(--pfe-theme--color--surface--base--theme, light)}:host([pfe-color=lightest]){--pfe-card--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-card--theme:var(--pfe-theme--color--surface--lightest--theme, light)}:host([pfe-color=accent]){--pfe-card--BackgroundColor:var(--pfe-theme--color--surface--accent, #004080);--pfe-card--theme:var(--pfe-theme--color--surface--accent--theme, saturated)}:host([pfe-color=complement]){--pfe-card--BackgroundColor:var(--pfe-theme--color--surface--complement, #002952);--pfe-card--theme:var(--pfe-theme--color--surface--complement--theme, saturated)}:host([on=dark]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}:host([on=saturated]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, #fafafa);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, #fafafa);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #8476d1);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-saturated, underline);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-saturated, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-saturated, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-saturated, underline)}:host([on=light]){--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}:host([pfe-size=small]){--pfe-card--PaddingTop:var(--pfe-theme--container-spacer, 16px);--pfe-card--PaddingRight:var(--pfe-theme--container-spacer, 16px);--pfe-card--PaddingBottom:var(--pfe-theme--container-spacer, 16px);--pfe-card--PaddingLeft:var(--pfe-theme--container-spacer, 16px)}:host([pfe-border]:not([pfe-border=false])){--pfe-card--BorderWidth:1px}.pfe-card__body ::slotted([pfe-overflow~=top]),.pfe-card__footer ::slotted([pfe-overflow~=top]),.pfe-card__header ::slotted([pfe-overflow~=top]){z-index:1;margin-top:-2rem;margin-top:calc(-1 * calc(16px * 2))!important;margin-top:calc(-1 * var(--pfe-card--PaddingTop,calc(var(--pfe-theme--container-spacer,16px) * 2)))!important}:host([has_header]) .pfe-card__body ::slotted([pfe-overflow~=top]),:host([has_header]) .pfe-card__footer ::slotted([pfe-overflow~=top]),:host([has_header]) .pfe-card__header ::slotted([pfe-overflow~=top]){padding-top:16px;padding-top:var(--pfe-card--spacing,var(--pfe-theme--container-spacer,16px))}.pfe-card__body ::slotted([pfe-overflow~=right]),.pfe-card__footer ::slotted([pfe-overflow~=right]),.pfe-card__header ::slotted([pfe-overflow~=right]){margin-right:-2rem;margin-right:calc(-1 * calc(16px * 2));margin-right:calc(-1 * var(--pfe-card--PaddingRight,calc(var(--pfe-theme--container-spacer,16px) * 2)))}.pfe-card__body ::slotted([pfe-overflow~=bottom]),.pfe-card__footer ::slotted([pfe-overflow~=bottom]),.pfe-card__header ::slotted([pfe-overflow~=bottom]){margin-bottom:-2rem;margin-bottom:calc(-1 * calc(calc(16px * 2) + 3px));margin-bottom:calc(-1 * calc(var(--pfe-card--PaddingBottom,calc(var(--pfe-theme--container-spacer,16px) * 2)) + var(--pfe-card--BorderRadius,var(--pfe-theme--surface--border-radius,3px))));-webkit-align-self:flex-end;-ms-flex-item-align:end;align-self:flex-end}.pfe-card__body ::slotted([pfe-overflow~=left]),.pfe-card__footer ::slotted([pfe-overflow~=left]),.pfe-card__header ::slotted([pfe-overflow~=left]){margin-left:-2rem;margin-left:calc(-1 * calc(16px * 2));margin-left:calc(-1 * var(--pfe-card--PaddingLeft,calc(var(--pfe-theme--container-spacer,16px) * 2)))}.pfe-card__body ::slotted(img),.pfe-card__footer ::slotted(img),.pfe-card__header ::slotted(img){max-width:100%!important;-webkit-align-self:flex-start;-ms-flex-item-align:start;align-self:flex-start;-o-object-fit:cover;object-fit:cover}.pfe-card__body ::slotted(img:not[pfe-overflow]),.pfe-card__footer ::slotted(img:not[pfe-overflow]),.pfe-card__header ::slotted(img:not[pfe-overflow]){-webkit-align-self:flex-start;-ms-flex-item-align:start;align-self:flex-start}.pfe-card__body ::slotted(img[pfe-overflow~=right]),.pfe-card__footer ::slotted(img[pfe-overflow~=right]),.pfe-card__header ::slotted(img[pfe-overflow~=right]){max-width:calc(100% + 2rem)!important;max-width:calc(100% + calc(16px * 2))!important;max-width:calc(100% + var(--pfe-card--PaddingRight,calc(var(--pfe-theme--container-spacer,16px) * 2)))!important}.pfe-card__body ::slotted(img[pfe-overflow~=left]),.pfe-card__footer ::slotted(img[pfe-overflow~=left]),.pfe-card__header ::slotted(img[pfe-overflow~=left]){max-width:calc(100% + 2rem)!important;max-width:calc(100% + calc(16px * 2))!important;max-width:calc(100% + var(--pfe-card--PaddingLeft,calc(var(--pfe-theme--container-spacer,16px) * 2)))!important}.pfe-card__body ::slotted(img[pfe-overflow~=right][pfe-overflow~=left]),.pfe-card__footer ::slotted(img[pfe-overflow~=right][pfe-overflow~=left]),.pfe-card__header ::slotted(img[pfe-overflow~=right][pfe-overflow~=left]){max-width:calc(100% + 4rem)!important;max-width:calc(100% + calc(calc(16px * 2) + calc(16px * 2)))!important;max-width:calc(100% + calc(var(--pfe-card--PaddingRight,calc(var(--pfe-theme--container-spacer,16px) * 2)) + var(--pfe-card--PaddingLeft,calc(var(--pfe-theme--container-spacer,16px) * 2))))!important}.pfe-card__header{z-index:2;background-color:rgba(0,0,0,.09);background-color:var(--pfe-card__header--BackgroundColor,rgba(0,0,0,var(--pfe-theme--opacity,.09)));color:#3c3f42;color:var(--pfe-card__header--Color,var(--pfe-broadcasted--text,#3c3f42));margin-top:calc(calc(16px * 2) * -1)!important;margin-top:calc(var(--pfe-card--PaddingTop,calc(var(--pfe-theme--container-spacer,16px) * 2)) * -1)!important;margin-right:calc(calc(16px * 2) * -1);margin-right:calc(var(--pfe-card--PaddingRight,calc(var(--pfe-theme--container-spacer,16px) * 2)) * -1);margin-bottom:16px;margin-bottom:var(--pfe-card--spacing--vertical,var(--pfe-card--spacing,var(--pfe-theme--container-spacer,16px)));margin-left:calc(calc(16px * 2) * -1);margin-left:calc(var(--pfe-card--PaddingLeft,calc(var(--pfe-theme--container-spacer,16px) * 2)) * -1);padding-top:16px;padding-top:var(--pfe-card--spacing--vertical,var(--pfe-card--spacing,var(--pfe-theme--container-spacer,16px)));padding-right:calc(16px * 2);padding-right:var(--pfe-card--PaddingRight,calc(var(--pfe-theme--container-spacer,16px) * 2));padding-left:calc(16px * 2);padding-left:var(--pfe-card--PaddingLeft,calc(var(--pfe-theme--container-spacer,16px) * 2));padding-bottom:16px;padding-bottom:var(--pfe-card--spacing--vertical,var(--pfe-card--spacing,var(--pfe-theme--container-spacer,16px)))}:host([on=dark]) .pfe-card__header{background-color:rgba(255,255,255,.09);background-color:var(--pfe-card__header--BackgroundColor--dark,rgba(255,255,255,var(--pfe-theme--opacity,.09)))}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pfe-card__header{background-color:#fff!important;color:#151515!important;color:var(--pfe-theme--color--text,#151515)!important}}:host(:not([has_body]):not([has_footer])) .pfe-card__header{margin-bottom:calc(16px * 2);margin-bottom:var(--pfe-card--PaddingBottom,calc(var(--pfe-theme--container-spacer,16px) * 2))}.pfe-card__header ::slotted([pfe-overflow~=top]){--pfe-card__overflow--MarginTop:calc(var(--pfe-card--PaddingTop, calc(var(--pfe-theme--container-spacer, 16px) * 2)) * -1)}:host(:not([has_header])) .pfe-card__header{display:none}:host([has_body],[has_footer]) .pfe-card__header ::slotted([pfe-overflow~=bottom]){--pfe-card__overflow--MarginBottom:calc(var(--pfe-card--spacing--vertical, var(--pfe-card--spacing, var(--pfe-theme--container-spacer, 16px))) * -1)}.pfe-card__header ::slotted([pfe-overflow~=bottom]){--pfe-card__overflow--MarginBottom:calc(var(--pfe-card--PaddingBottom, calc(var(--pfe-theme--container-spacer, 16px) * 2)) * -1)}.pfe-card__header ::slotted(h1){margin-bottom:0}.pfe-card__header ::slotted(h2){margin-bottom:0}.pfe-card__header ::slotted(h3){margin-bottom:0}.pfe-card__header ::slotted(h4){margin-bottom:0}.pfe-card__header ::slotted(h5){margin-bottom:0}.pfe-card__header ::slotted(h6){margin-bottom:0}:host(:not([has_header])) .pfe-card__body ::slotted([pfe-overflow~=top]){--pfe-card__overflow--MarginTop:calc(var(--pfe-card--PaddingTop, calc(var(--pfe-theme--container-spacer, 16px) * 2)) * -1)}.pfe-card__body ::slotted([pfe-overflow~=top]){z-index:1;--pfe-card__overflow--MarginTop:calc(var(--pfe-card--spacing--vertical, var(--pfe-card--spacing, var(--pfe-theme--container-spacer, 16px))) * -1)}.pfe-card__body ::slotted([pfe-overflow~=bottom]){--pfe-card__overflow--MarginBottom:calc(var(--pfe-card--PaddingBottom, calc(var(--pfe-theme--container-spacer, 16px) * 2)) * -1)}:host([has_footer]) .pfe-card__body ::slotted([pfe-overflow~=bottom]){--pfe-card__overflow--MarginBottom:calc(var(--pfe-card--spacing--vertical, var(--pfe-card--spacing, var(--pfe-theme--container-spacer, 16px))) * -1)}:host(:not([has_footer])) .pfe-card__body{margin-bottom:0}.pfe-card__footer{margin-top:auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;flex-direction:var(--pfe-card__footer--Row,row);-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-flex-wrap:var(--pfe-card__footer--Wrap,wrap);-ms-flex-wrap:var(--pfe-card__footer--Wrap,wrap);flex-wrap:var(--pfe-card__footer--Wrap,wrap);-webkit-box-align:baseline;-webkit-align-items:baseline;-ms-flex-align:baseline;align-items:baseline;-webkit-box-align:var(--pfe-card__footer--AlignItems,baseline);-webkit-align-items:var(--pfe-card__footer--AlignItems,baseline);-ms-flex-align:var(--pfe-card__footer--AlignItems,baseline);align-items:var(--pfe-card__footer--AlignItems,baseline)}.pfe-card__footer ::slotted([pfe-overflow~=bottom]){--pfe-card__overflow--MarginBottom:calc(var(--pfe-card--PaddingBottom, calc(var(--pfe-theme--container-spacer, 16px) * 2)) * -1)}:host(:not([has_footer])) .pfe-card__footer{display:none}.pfe-card__body,.pfe-card__header{margin-bottom:16px;margin-bottom:var(--pfe-card--spacing--vertical,var(--pfe-card--spacing,var(--pfe-theme--container-spacer,16px)))}.pfe-card__body ::slotted(p:first-child),.pfe-card__header ::slotted(p:first-child){margin-top:0}.pfe-card__body ::slotted(h1:first-child),.pfe-card__header ::slotted(h1:first-child){margin-top:0}.pfe-card__body ::slotted(h2:first-child),.pfe-card__header ::slotted(h2:first-child){margin-top:0}.pfe-card__body ::slotted(h3:first-child),.pfe-card__header ::slotted(h3:first-child){margin-top:0}.pfe-card__body ::slotted(h4:first-child),.pfe-card__header ::slotted(h4:first-child){margin-top:0}.pfe-card__body ::slotted(h5:first-child),.pfe-card__header ::slotted(h5:first-child){margin-top:0}.pfe-card__body ::slotted(h6:first-child),.pfe-card__header ::slotted(h6:first-child){margin-top:0}
/*# sourceMappingURL=pfe-card.min.css.map */
</style><div class="pfe-card__header">
  <slot name="pfe-card--header"></slot>
</div>
<div class="pfe-card__body">
  <slot></slot>
</div>
<div class="pfe-card__footer">
  <slot name="pfe-card--footer"></slot>
</div>`;
  }

  static get properties() {
    return {"color":{"title":"Background color","type":"string","enum":["lightest","base","darker","darkest","complement","accent"],"default":"base","prefixed":true,"observer":"_colorChanged"},"img-src":{"title":"Background image","type":"string","observer":"_imgSrcChanged"},"size":{"title":"Padding size","type":"string","enum":["small"],"observer":"_basicAttributeChanged"}};
  }

  static get slots() {
    return {"header":{"title":"Header","type":"array","namedSlot":true,"maxItems":3,"items":{"title":"Body item","oneOf":[{"$ref":"raw"}]}},"body":{"title":"Body","type":"array","namedSlot":false,"items":{"oneOf":[{"$ref":"pfe-card"},{"$ref":"raw"}]}},"footer":{"title":"Footer","type":"array","namedSlot":true,"maxItems":3,"items":{"oneOf":[{"$ref":"pfe-cta"},{"$ref":"raw"}]}}};
  }
  static get tag() {
    return "pfe-card";
  }

  get schemaUrl() {
    return "pfe-card.json";
  }

  get templateUrl() {
    return "pfe-card.html";
  }

  get styleUrl() {
    return "pfe-card.scss";
  }

  get imageSrc() {
    return this.getAttribute("pfe-img-src");
  }

  get backgroundColor() {
    return this.getAttribute("pfe-color") || "base";
  }

  static get observedAttributes() {
    return ["pfe-color", "pfe-img-src", "pfe-size"];
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeCard, { type: PfeCard.PfeType });
    this._observer = new MutationObserver(() => {
      this._mapSchemaToSlots(this.tag, this.slots);
    });
  }

  connectedCallback() {
    super.connectedCallback();

    // Initialize the background image attachment
    if (this.imageSrc) {
      this._imgSrcChanged("pfe-img-src", "", this.imageSrc);
    }

    this._observer.observe(this, { childList: true });
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
    // Strip the prefix from the attribute
    attr = attr.replace("pfe-", "");
    // If the observer is defined in the attribute properties
    if (this[attr] && this[attr].observer) {
      // Get the observer function
      let observer = this[this[attr].observer].bind(this);
      // If it's a function, allow it to run
      if (typeof observer === "function") observer(attr, oldValue, newValue);
    }
  }

  _basicAttributeChanged(attr, oldValue, newValue) {
    this[attr].value = newValue;
  }

  // Update the color attribute and contexts
  _colorChanged(attr, oldValue, newValue) {
    this[attr].value = newValue;
    // Trigger an update in nested components
    this.context_update();
  }

  // Update the background image
  _imgSrcChanged(attr, oldValue, newValue) {
    // Set the image as the background image
    this.style.backgroundImage = newValue ? `url('${newValue}')` : ``;
  }
}

PFElement.create(PfeCard);

export default PfeCard;
//# sourceMappingURL=pfe-card.js.map
