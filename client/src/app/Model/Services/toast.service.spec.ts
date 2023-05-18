import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a toast', () => {
    service.show('Hello, World!');
    expect(service.toasts.length).toBe(1);
    expect(service.toasts[0].textOrTpl).toBe('Hello, World!');
  });

  it('should remove a toast', () => {
    const toast = { textOrTpl: 'Hello, World!' };
    service.toasts.push(toast);
    service.remove(toast);
    expect(service.toasts.length).toBe(0);
  });

  it('should clear all toasts', () => {
    service.toasts.push({ textOrTpl: 'Toast 1' }, { textOrTpl: 'Toast 2' }, { textOrTpl: 'Toast 3' });
    service.clear();
    expect(service.toasts.length).toBe(0);
  });
});
