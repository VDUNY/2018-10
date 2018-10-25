/* istanbul ignore file */
import { Component, EventEmitter } from '@angular/core';

export interface MockComponentOptions {
  funcs?: any[];
  inputs?: string[];
  outputs?: string[];
  props?: any[];
  selector?: string;
  template?: string;
}

/**
 * Return a mock component for testing purposes
 * @param options {MockComponentOptions} provide meta-data required to mock the component
 * @returns {Component} a mock component matching provided specifications
 */
export function mockComponent (options: MockComponentOptions): Component {

  const metadata: Component = {
    selector: options.selector,
    template: options.template || '',
    inputs: options.inputs,
    outputs: options.outputs || [],
  };

  class Mock {}

  metadata.outputs.forEach((method: any) => {
    Mock.prototype[method] = new EventEmitter<any>();
  });

  (options.funcs || []).forEach((func: any) => {
    Mock.prototype[func] = jasmine.createSpy(func);
  });

  (options.props || []).forEach((prop: any) => {
    Mock.prototype[prop.propName] = prop.prop;
  });

  return Component(metadata)(Mock as any);
}
