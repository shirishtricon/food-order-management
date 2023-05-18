import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BulkUploadService } from './bulk-upload.service';

describe('BulkUploadService', () => {
  let service: BulkUploadService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BulkUploadService]
    });
    service = TestBed.inject(BulkUploadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('uploadFile', () => {
    it('should upload a file and return the response', () => {
      const file = new File(['test'], 'test.txt', { type: 'text/plain' });
      const dummyResponse = { success: true };

      service.uploadFile(file).subscribe((response) => {
        expect(response).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne('http://localhost:5000/admin/upload');
      expect(req.request.method).toBe('POST');
      expect(req.request.body instanceof FormData).toBeTruthy();
      expect(req.request.body.get('file')).toEqual(file);

      req.flush(dummyResponse);
    });

    it('should handle server-side errors', () => {
      const file = new File(['test'], 'test.txt', { type: 'text/plain' });
      const errorMessage = 'Error occurred on the server';
      const errorResponse = { message: errorMessage };

      service.uploadFile(file).subscribe(
        () => fail('expected an error, not a response'),
        (error) => {
          expect(error).toEqual(errorMessage);
        }
      );

      const req = httpMock.expectOne('http://localhost:5000/admin/upload');
      expect(req.request.method).toBe('POST');

      req.flush(errorResponse, { status: 500, statusText: 'Server Error' });
    });

    it('should handle client-side errors', () => {
      const file = new File(['test'], 'test.txt', { type: 'text/plain' });
      const errorMessage = 'Error occurred on the client';
      const clientError = new ErrorEvent('CLIENT_ERROR', {
        message: errorMessage,
      });

      service.uploadFile(file).subscribe(
        () => fail('expected an error, not a response'),
        (error) => {
          expect(error).toEqual(`Error: ${errorMessage}`);
        }
      );
      const req = httpMock.expectOne('http://localhost:5000/admin/upload');
      expect(req.request.method).toBe('POST');
      req.error(clientError);
    });
  });
});
