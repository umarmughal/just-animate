export interface IAnimation {
    finish: IAnimationFunction;
    play: IAnimationFunction;
    pause: IAnimationFunction;
    reverse: IAnimationFunction;
    cancel: IAnimationFunction;
    onfinish?: IConsumer<AnimationEvent>;
}

export interface IAnimationFunction {
    (fn?: ICallbackHandler): IAnimation;
}

export type ElementSource = Element | Element[] | string | jQuery | IElementProvider;

export interface IAnimationManager {
    animate(name: string, el: Element, timing?: IAnimationTiming);
}

export interface IAnimationOptions {
    keyframes: IKeyframe[];
    timings?: IAnimationTiming;
}

export interface IAnimationSequenceStep {
    el: ElementSource;
    name?: string;
    command?: string;
    timings?: IAnimationTiming;
    keyframes?: IKeyframe[];
    _animator?: IAnimation;
}

export interface IAnimationTiming {
    duration?: number;
    fill?: string;
    iterations?: number;
}

export interface IAnimationOptionsMap {
    [name: string]: IAnimationOptions
}

export interface ICallbackHandler {
    (err: any[]): void;
}

export interface IConsumer<T1> {
    (consumable: T1): any;
}

export interface ILookup<T1> {
    [key: string]: T1;
}

export interface IElementProvider {
    (): Element | Element[] | jQuery;
}

export interface IEventDispatcher {
    on(eventName: string, eventListener: IConsumer<any[]>);
    off(eventName: string, eventListener: IConsumer<any[]>);
    dispatch(eventName: string, args?: any[], cb?: ICallbackHandler);
}

export interface IIndexed<T> {
    [index: number]: T
    length: number;
}

export interface IKeyframe {
    offset: number;
    
    // css animation properties
    '-moz-outline-radius'?: number;
    '-moz-outline-radius-bottomleft'?: string;
    '-moz-outline-radius-bottomright'?: string;
    '-moz-outline-radius-topleft'?: string;
    '-moz-outline-radius-topright'?: string;
    '-webkit-text-stroke'?: string;
    '-webkit-text-stroke-color'?: string;
    '-webkit-touch-callout'?: string;
    'all'?: string;
    'backdrop-filter'?: string;
    'background'?: string;
    'background-color'?: string;
    'background-position'?: string;
    'background-size'?: string;
    'border'?: string;
    'border-bottom'?: string;
    'border-bottom-color'?: string;
    'border-bottom-left-radius'?: number;
    'border-bottom-right-radius'?: number;
    'border-bottom-width'?: string;
    'border-color'?: string;
    'border-left'?: string;
    'border-left-color'?: string;
    'border-left-width'?: string;
    'border-radius'?: number;
    'border-right'?: string;
    'border-right-color'?: string;
    'border-right-width'?: string;
    'border-top'?: string;
    'border-top-color'?: string;
    'border-top-left-radius'?: number;
    'border-top-right-radius'?: number;
    'border-top-width'?: string;
    'border-width'?: string;
    'bottom'?: string;
    'box-shadow'?: string;
    'clip'?: string;
    'clip-path'?: string;
    'color'?: string;
    'column-count'?: string;
    'column-gap'?: string;
    'column-rule'?: string;
    'column-rule-color'?: string;
    'column-rule-width'?: string;
    'column-width'?: string;
    'columns'?: string;
    'filter'?: string;
    'flex'?: string;
    'flex-basis'?: string;
    'flex-grow'?: string;
    'flex-shrink'?: string;
    'font'?: string;
    'font-size'?: string;
    'font-size-adjust'?: string;
    'font-stretch'?: string;
    'font-weight'?: string;
    'grid-column-gap'?: string;
    'grid-gap'?: string;
    'grid-row-gap'?: string;
    'height'?: string;
    'left'?: string;
    'letter-spacing'?: string;
    'line-height'?: string;
    'margin'?: string;
    'margin-bottom'?: string;
    'margin-left'?: string;
    'margin-right'?: string;
    'margin-top'?: string;
    'mask'?: string;
    'mask-position'?: string;
    'mask-size'?: string;
    'max-height'?: string;
    'max-width'?: string;
    'min-height'?: string;
    'min-width'?: string;
    'motion-offset'?: string;
    'motion-rotation'?: string;
    'object-position'?: string;
    'opacity'?: number;
    'order'?: number;
    'outline'?: string;
    'outline-color'?: string;
    'outline-offset'?: string;
    'outline-width'?: string;
    'padding'?: string;
    'padding-bottom'?: string;
    'padding-left'?: string;
    'padding-right'?: string;
    'padding-top'?: string;
    'perspective'?: string;
    'perspective-origin'?: string;
    'right'?: string;
    'scroll-snap-coordinate'?: string;
    'scroll-snap-destination'?: string;
    'shape-image-threshold'?: string;
    'shape-margin'?: string;
    'shape-outside'?: string;
    'text-decoration'?: string;
    'text-decoration-color'?: string;
    'text-emphasis'?: string;
    'text-emphasis-color'?: string;
    'text-indent'?: string;
    'text-shadow'?: string;
    'top'?: string;
    'transform'?: string;
    'transform-origin'?: string;
    'vertical-align'?: string;
    'visibility'?: string;
    'width'?: string;
    'word-spacing'?: string;
    'z-index'?: number;
}

export interface IMapper<T1, T2> {
    (mapable: T1): T2;
}

export interface jQuery {

}