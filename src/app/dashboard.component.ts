import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { DataService, KpiData, MonthlySpend, Contract } from './data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, GridModule, ChartsModule],
  template: `
    <div style="padding:2rem;">
      <h2 style="margin-bottom:2rem;">Dashboard</h2>

      <!-- KPI Cards -->
      <div
        style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:1.5rem; margin-bottom:3rem;"
      >
        <div
          style="background:#fff; border:1px solid #e1e5e9; border-radius:8px; padding:1.5rem; box-shadow:0 2px 4px rgba(0,0,0,0.1);"
        >
          <h3 style="margin:0 0 0.5rem 0; color:#323130; font-size:1rem;">Total Ceiling</h3>
          <div style="font-size:2rem; font-weight:600; color:#0078d4;">
            {{ formatCurrency(kpiData.totalCeiling) }}
          </div>
        </div>

        <div
          style="background:#fff; border:1px solid #e1e5e9; border-radius:8px; padding:1.5rem; box-shadow:0 2px 4px rgba(0,0,0,0.1);"
        >
          <h3 style="margin:0 0 0.5rem 0; color:#323130; font-size:1rem;">Total Spent</h3>
          <div style="font-size:2rem; font-weight:600; color:#d13438;">
            {{ formatCurrency(kpiData.totalSpent) }}
          </div>
        </div>

        <div
          style="background:#fff; border:1px solid #e1e5e9; border-radius:8px; padding:1.5rem; box-shadow:0 2px 4px rgba(0,0,0,0.1);"
        >
          <h3 style="margin:0 0 0.5rem 0; color:#323130; font-size:1rem;">Remaining</h3>
          <div style="font-size:2rem; font-weight:600; color:#107c10;">
            {{ formatCurrency(kpiData.remaining) }}
          </div>
        </div>
      </div>

      <!-- Charts and Grid Row -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:2rem; margin-bottom:2rem;">
        <!-- Monthly Spend Chart -->
        <div style="background:#fff; border:1px solid #e1e5e9; border-radius:8px; padding:1.5rem;">
          <h3 style="margin:0 0 1rem 0; color:#323130;">Monthly Spend</h3>
          <kendo-chart style="height:300px;">
            <kendo-chart-category-axis>
              <kendo-chart-category-axis-item
                [categories]="monthlySpendCategories"
              ></kendo-chart-category-axis-item>
            </kendo-chart-category-axis>
            <kendo-chart-series>
              <kendo-chart-series-item type="column" [data]="monthlySpendValues" color="#0078d4">
              </kendo-chart-series-item>
            </kendo-chart-series>
            <kendo-chart-title text=""></kendo-chart-title>
          </kendo-chart>
        </div>

        <!-- Expiring Contracts Grid -->
        <div style="background:#fff; border:1px solid #e1e5e9; border-radius:8px; padding:1.5rem;">
          <h3 style="margin:0 0 1rem 0; color:#323130;">Expiring Contracts</h3>
          <kendo-grid [data]="expiringContracts" [height]="300" style="font-size:0.875rem;">
            <kendo-grid-column field="title" title="Contract" [width]="180"></kendo-grid-column>
            <kendo-grid-column field="vendor" title="Vendor" [width]="140"></kendo-grid-column>
            <kendo-grid-column field="endDate" title="End Date" [width]="100">
              <ng-template kendoGridCellTemplate let-dataItem>
                {{ formatDate(dataItem.endDate) }}
              </ng-template>
            </kendo-grid-column>
          </kendo-grid>
        </div>
      </div>

      <a routerLink="/" style="color:#0078d4; text-decoration:none;">← Back to Home</a>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  kpiData: KpiData = { totalCeiling: 0, totalSpent: 0, remaining: 0 };
  monthlySpendData: MonthlySpend[] = [];
  expiringContracts: Contract[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.kpiData = this.dataService.getKpiData();
    this.monthlySpendData = this.dataService.getMonthlySpendData();
    this.expiringContracts = this.dataService.getExpiringContracts();
  }

  get monthlySpendCategories(): string[] {
    return this.monthlySpendData.map((item) => item.month);
  }

  get monthlySpendValues(): number[] {
    return this.monthlySpendData.map((item) => item.amount);
  }

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
}
