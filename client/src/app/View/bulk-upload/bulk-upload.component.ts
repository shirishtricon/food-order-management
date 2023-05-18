import { Component, OnInit, ViewChild } from '@angular/core';
import { BulkUploadService } from 'src/app/Model/Services/item/bulk-upload.service';

declare var window: any;

import { Modal } from 'bootstrap';
@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.css']
})
export class BulkUploadComponent implements OnInit{
  file: File | null = null;
  errorMessage: string = '';
  @ViewChild('bulkItemModal', { static: false }) bulkItemModal: any;
  formModal: any;

  constructor(private bulkUploadService: BulkUploadService) { }

  ngOnInit(): void {
    this.formModal = new Modal(
      document.getElementById('bulkItemModal') as HTMLElement
    )
  }

  onFileSelected(event: any): void {
    let fileType = event.target.files[0].name.substr( event.target.files[0].name.lastIndexOf('.') + 1);
    if(fileType === 'xlsx' || fileType === 'csv') {
      this.file = event.target.files[0];
      this.errorMessage = '';
    } else {
      this.file = null;
      this.errorMessage = 'Invalid File type'
    }
    
  }

  onUpload(): void {
    if (!this.file) {
      this.errorMessage = 'Please select a valid file'
      console.error('No file selected.');
      return;
    } else {
      this.bulkUploadService.uploadFile(this.file).subscribe(
        (response) => {
          console.log('File uploaded successfully.');
          this.errorMessage = '';
          this.openModal();
        },
        (error) => {
          console.error('File upload failed:', error);
          this.errorMessage = error;
        }
      );
    }

    
  }

  openModal() {
    this.formModal.show();
  }
}
