/// <reference path="../just-animate.d.ts" />
"use strict";
var easings_1 = require('../easings');
var Helpers_1 = require('./Helpers');
var Transformers_1 = require('./Transformers');
/**
 * Animates one or more elements
 *
 * @export
 * @class ElementAnimator
 * @implements {ja.IAnimator}
 */
var ElementAnimator = (function () {
    /**
     * Creates an instance of ElementAnimator.
     *
     * @param {ja.IAnimationManager} manager JustAnimate instance
     * @param {(string | ja.IIndexed<ja.IKeyframe>)} keyframesOrName keyframe definition or name of registered animation
     * @param {ja.ElementSource} el element or element source to animate
     * @param {ja.IAnimationEffectTiming} [timings] optional timing overrides.  required when passing in keyframes
     */
    function ElementAnimator(manager, keyframesOrName, el, timings) {
        var _this = this;
        if (!keyframesOrName) {
            return;
        }
        var keyframes;
        if (Helpers_1.isString(keyframesOrName)) {
            // if keyframes is a string, lookup keyframes from registry
            var definition = manager.findAnimation(keyframesOrName);
            keyframes = definition.keyframes;
            // use registered timings as default, then load timings from params           
            timings = Helpers_1.extend({}, definition.timings, timings);
        }
        else {
            // otherwise, translate keyframe properties
            keyframes = Helpers_1.map(keyframesOrName, Transformers_1.keyframeTransformer);
        }
        if (timings && timings.easing) {
            // if timings contains an easing property, 
            var easing = easings_1.easings[timings.easing];
            if (easing) {
                timings.easing = easing;
            }
        }
        // add duration to object    
        this.duration = timings.duration;
        // get list of elements to animate
        var elements = getElements(el);
        // call .animate on all elements and get a list of their players        
        this._animators = Helpers_1.multiapply(elements, 'animate', [keyframes, timings]);
        // hookup finish event for when it happens naturally    
        if (this._animators.length > 0) {
            // todo: try to find a better way than just listening to one of them
            /**
             * (description)
             */
            this._animators[0].onfinish = function () {
                _this.finish();
            };
        }
    }
    Object.defineProperty(ElementAnimator.prototype, "playbackRate", {
        /**
         * Returns 0 when not playing, 1 when playing forward, and -1 when playing backward
         *
         * @type {number}
         */
        get: function () {
            var first = Helpers_1.head(this._animators);
            return first ? first.playbackRate : 0;
        },
        /**
         * Sets the playbackRate to the specified value
         */
        set: function (val) {
            Helpers_1.each(this._animators, function (a) { return a.playbackRate = val; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementAnimator.prototype, "currentTime", {
        /**
         * Returns current time of the animation
         *
         * @type {number}
         */
        get: function () {
            return Helpers_1.max(this._animators, 'currentTime') || 0;
        },
        /**
         * Sets the animation current time
         */
        set: function (elapsed) {
            Helpers_1.each(this._animators, function (a) { return a.currentTime = elapsed; });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Finishes the current animation
     *
     * @param {ja.ICallbackHandler} [fn] optional error handler
     * @returns {ja.IAnimator} this instance of the Element Animator
     */
    ElementAnimator.prototype.finish = function (fn) {
        var _this = this;
        Helpers_1.multiapply(this._animators, 'finish', [], fn);
        if (this.playbackRate < 0) {
            Helpers_1.each(this._animators, function (a) { return a.currentTime = 0; });
        }
        else {
            Helpers_1.each(this._animators, function (a) { return a.currentTime = _this.duration; });
        }
        if (Helpers_1.isFunction(this.onfinish)) {
            this.onfinish(this);
        }
        return this;
    };
    /**
     * Plays the animation
     *
     * @param {ja.ICallbackHandler} [fn] optional error handler
     * @returns {ja.IAnimator} this instance of Element Animator
     */
    ElementAnimator.prototype.play = function (fn) {
        Helpers_1.multiapply(this._animators, 'play', [], fn);
        return this;
    };
    /**
     * Pauses the animation
     *
     * @param {ja.ICallbackHandler} [fn] optional error handler
     * @returns {ja.IAnimator}  this instance of Element Animator
     */
    ElementAnimator.prototype.pause = function (fn) {
        Helpers_1.multiapply(this._animators, 'pause', [], fn);
        return this;
    };
    /**
     * Reverses the direction of the animation
     *
     * @param {ja.ICallbackHandler} [fn] optional error handler
     * @returns {ja.IAnimator} this instance of Element Animator
     */
    ElementAnimator.prototype.reverse = function (fn) {
        Helpers_1.multiapply(this._animators, 'reverse', [], fn);
        return this;
    };
    /**
     * Cancels the animation
     *
     * @param {ja.ICallbackHandler} [fn] optional error handler
     * @returns {ja.IAnimator} this instance of Element Animator
     */
    ElementAnimator.prototype.cancel = function (fn) {
        Helpers_1.multiapply(this._animators, 'cancel', [], fn);
        Helpers_1.each(this._animators, function (a) { return a.currentTime = 0; });
        if (Helpers_1.isFunction(this.oncancel)) {
            this.oncancel(this);
        }
        return this;
    };
    return ElementAnimator;
}());
exports.ElementAnimator = ElementAnimator;
/**
 * Recursively resolves the element source from dom, selector, jquery, array, and function sources
 *
 * @param {ja.ElementSource} source from which to locate elements
 * @returns {Element[]} array of elements found
 */
function getElements(source) {
    if (!source) {
        throw Error('source is undefined');
    }
    if (Helpers_1.isString(source)) {
        // if query selector, search for elements 
        var nodeResults = document.querySelectorAll(source);
        return Helpers_1.toArray(nodeResults);
    }
    if (source instanceof Element) {
        // if a single element, wrap in array 
        return [source];
    }
    if (Helpers_1.isFunction(source)) {
        // if function, call it and call this function
        var provider = source;
        var result = provider();
        return getElements(result);
    }
    if (Helpers_1.isArray(source)) {
        // if array or jQuery object, flatten to an array
        var elements_1 = [];
        Helpers_1.each(source, function (i) {
            // recursively call this function in case of nested elements
            var innerElements = getElements(i);
            elements_1.push.apply(elements_1, innerElements);
        });
        return elements_1;
    }
    // otherwise return empty    
    return [];
}
