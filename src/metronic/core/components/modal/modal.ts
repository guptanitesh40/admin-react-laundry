/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import KTData from '../../helpers/data';
import KTDom from '../../helpers/dom';
import KTEventHandler from '../../helpers/event-handler';
import KTComponent from '../component';
import { KTModalInterface, KTModalConfigInterface } from './types';

declare global {
  interface Window {
    KT_MODAL_INITIALIZED: boolean;
  }
}

export class KTModal extends KTComponent implements KTModalInterface {
  protected override _name: string = 'modal';
  protected override _defaultConfig: KTModalConfigInterface = {
    zindex: '90',
    backdrop: true,
    backdropClass: 'transition-all duration-300 fixed inset-0 bg-gray-900 opacity-25',
    backdropStatic: false,
    keyboard: true,
    disableScroll: true,
    persistent: false,
    focus: true,
    hiddenClass: 'hidden'
  };
  protected override _config: KTModalConfigInterface = this._defaultConfig;
  protected _isOpen: boolean = false;
  protected _isTransitioning: boolean = false;
  protected _backdropElement: HTMLElement | null = null;
  protected _targetElement: HTMLElement | null = null;

  constructor(element: HTMLElement, config?: KTModalConfigInterface) {
    super();

    if (KTData.has(element as HTMLElement, this._name)) return;

    this._init(element);
    this._buildConfig(config);
    this._handlers();
  }

  protected _handlers() {
    this._element.addEventListener('click', (event: Event) => {
      if (this._element !== event.target ) return;

      if (this._getOption('backdropStatic') === false) {
        this._hide();
      }
    });
  }

  protected _toggle(targetElement?: HTMLElement): void {
    const payload = { cancel: false };
    this._fireEvent('toggle', payload);
    this._dispatchEvent('toggle', payload);
    if (payload.cancel === true) {
      return;
    }

    if (this._isOpen === true) {
      this._hide();
    } else {
      this._show(targetElement);
    }
  }

  protected _show(targetElement?: HTMLElement): void {
    if (this._isOpen || this._isTransitioning) {
      return;
    }

    //const beforeScroll = this.fireEvent('beforeScroll', this.el);
    //this.dispatch('beforeScroll.hs.scrollspy', this.el, this.el);
    //if (beforeScroll instanceof Promise) beforeScroll.then(() => scrollFn());
    //else scrollFn();

    if (targetElement) this._targetElement = targetElement;

    const payload = { cancel: false };
    this._fireEvent('show', payload);
    this._dispatchEvent('show', payload);
    if (payload.cancel === true) {
      return;
    }    

    KTModal.hide();

    if (!this._element) return;
    this._isTransitioning = true;
    this._element.setAttribute('role', 'dialog');
    this._element.setAttribute('aria-modal', 'true');
    this._element.setAttribute('tabindex', '-1');

    this._setZindex();
    if (this._getOption('backdrop') === true) this._createBackdrop();    

    if (this._getOption('disableScroll')) {
      document.body.style.overflow = 'hidden';
    }

    this._element.style.display = 'block';
    KTDom.reflow(this._element);
    this._element.classList.add('open');
    this._element.classList.remove(this._getOption('hiddenClass') as string);

    
    KTDom.transitionEnd(this._element, () => {
      this._isTransitioning = false;
      this._isOpen = true;

      if (this._getOption('focus') === true) {
        this._autoFocus();
      }

      this._fireEvent('shown');
      this._dispatchEvent('shown');
    });  
  }

  protected _hide(): void {
    if (!this._element) return;
    if (this._isOpen === false || this._isTransitioning) {
      return;
    }

    const payload = { cancel: false };
    this._fireEvent('hide', payload);
    this._dispatchEvent('hide', payload);
    if (payload.cancel === true) {
      return;
    }

    this._isTransitioning = true;
    this._element.removeAttribute('role');
    this._element.removeAttribute('aria-modal');
    this._element.removeAttribute('tabindex');
    if (this._getOption('disableScroll')) {
      document.body.style.overflow = '';
    }

    KTDom.reflow(this._element);
    this._element.classList.remove('open');

    if (this._getOption('backdrop') === true) {
      this._deleteBackdrop();
    }

    KTDom.transitionEnd(this._element, () => {
      if (!this._element) return;

      this._isTransitioning = false;
      this._isOpen = false;
      this._element.style.display = '';
      this._element.classList.add(this._getOption('hiddenClass') as string);

      this._fireEvent('hidden');
      this._dispatchEvent('hidden');
    });
  }

  protected _setZindex(): void {
    let zindex: number = parseInt(this._getOption('zindex') as string);
    
    if (parseInt(KTDom.getCssProp(this._element, 'z-index')) > zindex) {
      zindex = parseInt(KTDom.getCssProp(this._element, 'z-index'));
    }
    
    if (KTDom.getHighestZindex(this._element) > zindex) {
      zindex =KTDom.getHighestZindex(this._element) + 1;
    }

    this._element.style.zIndex = String(zindex);
  }

  protected _autoFocus(): void {
    if (!this._element) return;
    const input: HTMLInputElement | null = this._element.querySelector('[data-modal-input-focus]');
    if (!input) return; else input.focus();
  }

  protected _createBackdrop(): void {
    if (!this._element) return;
    const zindex: number = parseInt(KTDom.getCssProp(this._element, 'z-index'));
    this._backdropElement = document.createElement('DIV');
    this._backdropElement.style.zIndex = (zindex - 1).toString();
    this._backdropElement.classList.add('modal-backdrop');
    document.body.append(this._backdropElement);
    KTDom.reflow(this._backdropElement);
    KTDom.addClass(this._backdropElement, this._getOption('backdropClass') as string);    
  }

  protected _deleteBackdrop(): void {
    if (!this._backdropElement) return;

    KTDom.reflow(this._backdropElement);
    this._backdropElement.style.opacity = "0";

    KTDom.transitionEnd(this._backdropElement, () => {
      if (!this._backdropElement) return;
      KTDom.remove(this._backdropElement);
    });
  }

  public toggle(targetElement?: HTMLElement): void {
    return this._toggle(targetElement);
  }

  public show(targetElement?: HTMLElement): void {
    return this._show(targetElement);
  }

  public hide(): void {
    return this._hide();
  }

  public getTargetElement(): HTMLElement | null {
    return this._targetElement;
  }

  public isOpen(): boolean {
    return this._isOpen;
  }

  public static getInstance(element: HTMLElement): KTModal {
		if (!element) return null;

		if (KTData.has(element, 'modal')) {
			return KTData.get(element, 'modal') as KTModal;
		}

		if (element.getAttribute('data-modal') === "true") {
			return new KTModal(element);
		}

		return null;
	}

  public static getOrCreateInstance(element: HTMLElement, config?: KTModalConfigInterface): KTModal {
    return this.getInstance(element) || new KTModal(element, config);
  }

  public static hide(): void {
    const elements = document.querySelectorAll('[data-modal]');

    elements.forEach((element) => {
      const modal = KTModal.getInstance(element as HTMLElement);

      if (modal && modal.isOpen()) {
        modal.hide();
      }
    });
  }

  public static handleToggle(): void {
    KTEventHandler.on(document.body, '[data-modal-toggle]', 'click', (event: Event, target: HTMLElement) => {
      event.stopPropagation();

      const selector = target.getAttribute("data-modal-toggle");
      if (!selector) return;

      const modalElement = document.querySelector(selector);
      const modal = KTModal.getInstance(modalElement as HTMLElement);
      if (modal) {
        modal.toggle(target);
      }
    });
  }

  public static handleDismiss(): void {
    KTEventHandler.on(document.body, '[data-modal-dismiss]', 'click', (event: Event, target: HTMLElement) => {
      event.stopPropagation();

      const modalElement = target.closest('[data-modal]') as HTMLElement;
      if (modalElement) {
        const modal = KTModal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }      
    });
  }

  public static handleClickAway() {
    document.addEventListener('click', (event: Event) => {
      const modalElement = document.querySelector('.open[data-modal]');
      if (!modalElement) return;

      const modal = KTModal.getInstance(modalElement as HTMLElement);
      if (!modal) return;

      if (modal.getOption('persistent')) return;

      if (modal.getOption('backdrop')) return;

      if (modalElement !== event.target &&
        modal.getTargetElement() !== event.target &&
        modalElement.contains(event.target as HTMLElement) === false) {
        modal.hide();
      }
    });
  }

  public static handleKeyword() {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      const modalElement = document.querySelector('.open[data-modal]');
      const modal = KTModal.getInstance(modalElement as HTMLElement);
      if (!modal) {
        return;
      }

      // if esc key was not pressed in combination with ctrl or alt or shift
      if (event.key === 'Escape' && !(event.ctrlKey || event.altKey || event.shiftKey)) {
        modal.hide();
      }

      if (event.code === 'Tab' && !event.metaKey) {
       return;
      }
    });
  }

  public static createInstances(): void {
    const elements = document.querySelectorAll('[data-modal="true"]');

    elements.forEach((element) => {
      new KTModal(element as HTMLElement);
    });
  }

  public static init(): void {
    KTModal.createInstances();

    if (window.KT_MODAL_INITIALIZED !== true) {
      KTModal.handleToggle();
      KTModal.handleDismiss();
      KTModal.handleClickAway();
      KTModal.handleKeyword();      
      window.KT_MODAL_INITIALIZED = true;
    }
  }
}
