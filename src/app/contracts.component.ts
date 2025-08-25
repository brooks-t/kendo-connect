import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GridComponent, GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { TextBoxModule, NumericTextBoxModule } from '@progress/kendo-angular-inputs';
import { DateInputModule } from '@progress/kendo-angular-dateinputs';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService, Contract } from './data.service';
import { State, process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-contracts',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    GridModule,
    DialogModule,
    TextBoxModule,
    NumericTextBoxModule,
    DateInputModule,
    DropDownListModule,
    ButtonModule,
    ExcelExportModule,
    PDFExportModule,
    ReactiveFormsModule,
  ],
  template: `
    <div style="padding:2rem;">
      <div
        style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;"
      >
        <h2 style="margin:0;">Contracts Management</h2>
        <div style="display:flex;gap:1rem;">
          <button kendoButton [primary]="true" (click)="openAddDialog()">Add Contract</button>
          <button kendoButton (click)="exportToExcel()">Export Excel</button>
          <button kendoButton (click)="exportToPDF()">Export PDF</button>
        </div>
      </div>

      <kendo-grid
        #grid
        [data]="gridData"
        [pageSize]="pageSize"
        [pageable]="true"
        [sortable]="true"
        [filterable]="false"
        [height]="500"
        (dataStateChange)="onDataStateChange($event)"
      >
        <kendo-grid-column
          field="id"
          title="ID"
          [width]="80"
          [filterable]="false"
        ></kendo-grid-column>

        <kendo-grid-column field="title" title="Contract Title" [width]="200">
          <ng-template kendoGridCellTemplate let-dataItem>
            <span style="font-weight:500;">{{ dataItem.title }}</span>
          </ng-template>
        </kendo-grid-column>

        <kendo-grid-column field="vendor" title="Vendor" [width]="150"></kendo-grid-column>

        <kendo-grid-column field="startDate" title="Start Date" [width]="120">
          <ng-template kendoGridCellTemplate let-dataItem>
            {{ formatDate(dataItem.startDate) }}
          </ng-template>
        </kendo-grid-column>

        <kendo-grid-column field="endDate" title="End Date" [width]="120">
          <ng-template kendoGridCellTemplate let-dataItem>
            {{ formatDate(dataItem.endDate) }}
          </ng-template>
        </kendo-grid-column>

        <kendo-grid-column field="ceiling" title="Ceiling" [width]="120">
          <ng-template kendoGridCellTemplate let-dataItem>
            {{ formatCurrency(dataItem.ceiling) }}
          </ng-template>
        </kendo-grid-column>

        <kendo-grid-column field="spent" title="Spent" [width]="120">
          <ng-template kendoGridCellTemplate let-dataItem>
            {{ formatCurrency(dataItem.spent) }}
          </ng-template>
        </kendo-grid-column>

        <kendo-grid-column field="status" title="Status" [width]="100">
          <ng-template kendoGridCellTemplate let-dataItem>
            <span [style.color]="getStatusColor(dataItem.status)" style="font-weight:500;">
              {{ dataItem.status }}
            </span>
          </ng-template>
        </kendo-grid-column>

        <kendo-grid-column title="Actions" [width]="140" [filterable]="false" [sortable]="false">
          <ng-template kendoGridCellTemplate let-dataItem>
            <div style="display:flex;gap:0.5rem;">
              <button
                kendoButton
                [size]="'small'"
                [fillMode]="'flat'"
                (click)="openEditDialog(dataItem)"
              >
                Edit
              </button>
              <button
                kendoButton
                [size]="'small'"
                [fillMode]="'flat'"
                [themeColor]="'error'"
                (click)="deleteContract(dataItem.id)"
              >
                Delete
              </button>
            </div>
          </ng-template>
        </kendo-grid-column>
      </kendo-grid>

      <!-- Contract Edit Dialog -->
      <kendo-dialog
        *ngIf="dialogOpened"
        [title]="dialogTitle"
        [width]="500"
        [height]="600"
        (close)="closeDialog()"
      >
        <form [formGroup]="contractForm" (ngSubmit)="saveContract()">
          <div style="display:flex;flex-direction:column;gap:1rem;">
            <div>
              <label>Contract Title *</label>
              <input kendoTextBox formControlName="title" style="width:100%;margin-top:0.5rem;" />
            </div>

            <div>
              <label>Vendor *</label>
              <input kendoTextBox formControlName="vendor" style="width:100%;margin-top:0.5rem;" />
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
              <div>
                <label>Start Date *</label>
                <kendo-dateinput
                  formControlName="startDate"
                  style="width:100%;margin-top:0.5rem;"
                ></kendo-dateinput>
              </div>
              <div>
                <label>End Date *</label>
                <kendo-dateinput
                  formControlName="endDate"
                  style="width:100%;margin-top:0.5rem;"
                ></kendo-dateinput>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
              <div>
                <label>Ceiling Amount *</label>
                <kendo-numerictextbox
                  formControlName="ceiling"
                  style="width:100%;margin-top:0.5rem;"
                ></kendo-numerictextbox>
              </div>
              <div>
                <label>Spent Amount</label>
                <kendo-numerictextbox
                  formControlName="spent"
                  style="width:100%;margin-top:0.5rem;"
                ></kendo-numerictextbox>
              </div>
            </div>

            <div>
              <label>Status *</label>
              <kendo-dropdownlist
                formControlName="status"
                [data]="statusOptions"
                textField="text"
                valueField="value"
                style="width:100%;margin-top:0.5rem;"
              >
              </kendo-dropdownlist>
            </div>
          </div>

          <div style="display:flex;justify-content:flex-end;gap:1rem;margin-top:2rem;">
            <button kendoButton type="button" (click)="closeDialog()">Cancel</button>
            <button kendoButton [primary]="true" type="submit" [disabled]="contractForm.invalid">
              Save
            </button>
          </div>
        </form>
      </kendo-dialog>

      <a
        routerLink="/"
        style="color:#0078d4; text-decoration:none; display:inline-block; margin-top:2rem;"
        >← Back to Home</a
      >
    </div>
  `,
})
export class ContractsComponent implements OnInit {
  @ViewChild('grid') grid!: GridComponent;

  contracts: Contract[] = [];
  gridData: Contract[] = [];
  pageSize = 10;

  // Dialog state
  dialogOpened = false;
  dialogTitle = '';
  editingContract: Contract | null = null;
  contractForm: FormGroup;

  statusOptions = [
    { text: 'Active', value: 'Active' },
    { text: 'Expiring', value: 'Expiring' },
    { text: 'Expired', value: 'Expired' },
  ];

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.contractForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadContracts();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      vendor: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      ceiling: [0, [Validators.required, Validators.min(1)]],
      spent: [0, Validators.min(0)],
      status: ['Active', Validators.required],
    });
  }

  loadContracts(): void {
    this.contracts = this.dataService.getAllContracts();
    this.gridData = [...this.contracts];
  }

  onDataStateChange(state: State): void {
    this.gridData = process(this.contracts, state).data;
  }

  // Dialog operations
  openAddDialog(): void {
    this.dialogTitle = 'Add New Contract';
    this.editingContract = null;
    this.contractForm.reset({
      title: '',
      vendor: '',
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      ceiling: 0,
      spent: 0,
      status: 'Active',
    });
    this.dialogOpened = true;
  }

  openEditDialog(contract: Contract): void {
    this.dialogTitle = 'Edit Contract';
    this.editingContract = contract;
    this.contractForm.patchValue({
      title: contract.title,
      vendor: contract.vendor,
      startDate: contract.startDate,
      endDate: contract.endDate,
      ceiling: contract.ceiling,
      spent: contract.spent,
      status: contract.status,
    });
    this.dialogOpened = true;
  }

  closeDialog(): void {
    this.dialogOpened = false;
    this.editingContract = null;
  }

  saveContract(): void {
    if (this.contractForm.valid) {
      const formValue = this.contractForm.value;

      if (this.editingContract) {
        // Update existing contract
        this.dataService.updateContract(this.editingContract.id, formValue);
      } else {
        // Add new contract
        this.dataService.addContract(formValue);
      }

      this.loadContracts();
      this.closeDialog();
    }
  }

  deleteContract(id: number): void {
    if (confirm('Are you sure you want to delete this contract?')) {
      this.dataService.deleteContract(id);
      this.loadContracts();
    }
  }

  // Export functions
  exportToExcel(): void {
    this.grid.saveAsExcel();
  }

  exportToPDF(): void {
    this.grid.saveAsPDF();
  }

  // Helper functions
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date));
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Active':
        return '#107c10';
      case 'Expiring':
        return '#d83b01';
      case 'Expired':
        return '#a80000';
      default:
        return '#323130';
    }
  }
}
