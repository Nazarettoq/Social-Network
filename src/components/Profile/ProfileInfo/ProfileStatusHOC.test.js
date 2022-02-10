import React from 'react';
import ProfileStatus from './ProfileStatusHOC';
import TestRenderer from 'react-test-renderer';
import { render, unmountComponentAtNode } from 'react-dom';
const { act } = TestRenderer;
let container = null;
beforeEach(() => {
  // подготавливаем DOM-элемент, куда будем рендерить
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // подчищаем после завершения
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Profile component', () => {
  test('status from props should be  in the state', () => {
    act(() => {
      render(<ProfileStatus status="Hello world!" />, container);
    });

    expect(container.textContent).toBe('Hello world!');
  });
});
