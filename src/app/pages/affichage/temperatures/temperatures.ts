import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import sallesJson from '../../../../app/data/salles.json';
import temperaturesJson from '../../../../app/data/temperatures.json';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-temperatures',
  imports: [FormsModule, DatePickerModule, SelectModule, ChartModule],
  templateUrl: './temperatures.html',
  styleUrls: ['./temperatures.css'],
})
export class Temperatures implements OnInit {
  data: any;
  options: any;

  platformId = inject(PLATFORM_ID);

  temperature = signal(21);
  selectedDate = signal(new Date());
  salles = sallesJson;
  selectedSalle = signal(this.salles[0]);

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.selectedSalle.set(this.salles[0]);
    this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      // Préparer les données pour le graphique
      const chartData = this.prepareChartData();

      this.data = {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Consigne',
            data: chartData.consignes,
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-orange-500') || '#ff9a5a',
            backgroundColor: documentStyle.getPropertyValue('--p-orange-100') || '#ffeee5',
            tension: 0.4,
            borderWidth: 2
          },
          {
            label: 'Mesure',
            data: chartData.mesures,
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-cyan-500') || '#5db8ff',
            backgroundColor: documentStyle.getPropertyValue('--p-cyan-100') || '#e7f7ff',
            tension: 0.4,
            borderWidth: 2
          }
        ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          },
          title: {
            display: true,
            text: `Températures - Salle ${this.selectedSalle().NUMERO}`,
            color: textColor,
            font: {
              size: 16
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Temps',
              color: textColor
            },
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          },
          y: {
            title: {
              display: true,
              text: 'Température (°C)',
              color: textColor
            },
            ticks: {
              color: textColorSecondary,
              callback: function(value: any) {
                return value + '°C';
              }
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          }
        }
      };
      this.cd.markForCheck();
    }
  }

  prepareChartData() {
    const salleData = temperaturesJson.filter(item => 
      item.LOCAL_NUMERO === this.selectedSalle().NUMERO
    );

    // Trier par date
    salleData.sort((a, b) => new Date(a.DATE).getTime() - new Date(b.DATE).getTime());

    const labels: string[] = [];
    const consignes: number[] = [];
    const mesures: number[] = [];

    const dateMap = new Map<string, { consigne?: number, mesure?: number }>();

    salleData.forEach(item => {
      const date = new Date(item.DATE);
      const timeLabel = date.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      if (!dateMap.has(timeLabel)) {
        dateMap.set(timeLabel, {});
      }
      
      const entry = dateMap.get(timeLabel)!;
      
      if (item.TYPE === 'Consigne') {
        entry.consigne = parseFloat(item.VALUE);
      } else if (item.TYPE === 'Mesure') {
        entry.mesure = parseFloat(item.VALUE);
      }
    });

    // Convertir en arrays pour Chart.js
    Array.from(dateMap.entries()).forEach(([time, data]) => {
      labels.push(time);
      consignes.push(data.consigne ?? 0);
      mesures.push(data.mesure ?? 0);
    });

    return { labels, consignes, mesures };
  }

  get temperatureValue() {
    return this.temperature();
  }

  afficherTemperature() {
    this.initChart(); // Recharger le graphique quand la salle change
  }

  private readonly min = -10;
  private readonly max = 40;

  fillPercent = computed(() => {
    const v = this.temperature();
    const clamp = Math.max(this.min, Math.min(this.max, v));
    return Math.round(((clamp - this.min) / (this.max - this.min)) * 100);
  });

  accentColor = computed(() => {
    const t = this.temperature();
    if (t <= 0) return '#5db8ff';
    if (t <= 15) return '#7be1ff';
    if (t <= 25) return '#ffd36b';
    if (t <= 32) return '#ff9a5a';
    return '#ff6b6b';
  });
}
