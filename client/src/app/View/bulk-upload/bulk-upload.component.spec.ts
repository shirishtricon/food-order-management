import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BulkUploadComponent } from './bulk-upload.component';
import { BulkUploadService } from 'src/app/Model/Services/item/bulk-upload.service';
import { of } from 'rxjs';

describe('BulkUploadComponent', () => {
  let component: BulkUploadComponent;
  let fixture: ComponentFixture<BulkUploadComponent>;
  let httpMock: HttpTestingController;
  let bulkUploadService: BulkUploadService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BulkUploadComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BulkUploadComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    bulkUploadService = TestBed.inject(BulkUploadService)
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set file when onFileSelected is called with a valid file', () => {
    const file = new File(['dummy content'], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const event = { target: { files: [file] } };
    component.onFileSelected(event);
    expect(component.file).toEqual(file);
    expect(component.errorMessage).toBe('');
  });

  it('should not set file and set error message when onFileSelected is called with an invalid file type', () => {
    const file = new File(['dummy content'], 'test.txt', { type: 'text/plain' });
    const event = { target: { files: [file] } };
    component.onFileSelected(event);
    expect(component.file).toBeNull();
    expect(component.errorMessage).toBe('Invalid File type');
  });

  it('should set error message when onUpload is called without selecting a file', () => {
    component.onUpload();
    expect(component.errorMessage).toBe('Please select a valid file');
  });

  it('should handle file upload failure and set error message', () => {
    const file = new File(['dummy content'], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    component.file = file;
    spyOn(component, 'openModal');
    component.onUpload();
    const req = httpMock.expectOne('http://localhost:5000/admin/upload');
    expect(req.request.method).toBe('POST');
    const errorMessage = 'Error: ';
    const errorEvent = new ErrorEvent('error', { error: errorMessage });
    req.error(errorEvent);
  
    expect(component.errorMessage).toBe(errorMessage);
    expect(component.openModal).not.toHaveBeenCalled();
  });


  it('should set errorMessage to empty string and call openModal when file is uploaded', () => {
    spyOn(bulkUploadService, 'uploadFile').and.returnValue(of({}));
    spyOn(component, 'openModal');
    const file = new File(['file content'], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    component.file = file;
    component.onUpload();
    expect(component.errorMessage).toBe('');
    expect(component.openModal).toHaveBeenCalled();
  }); 
});
