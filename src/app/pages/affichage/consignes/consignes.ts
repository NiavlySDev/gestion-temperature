import { Component, input, computed, signal } from '@angular/core';
import { DecimalPipe, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { Slider } from 'primeng/slider';
import sallesJson from '../../../../app/data/salles.json';

@Component({
  selector: 'app-consignes',
  imports: [DecimalPipe, NgStyle, FormsModule, Slider, SelectModule, DatePickerModule],
  templateUrl: './consignes.html',
  styleUrl: './consignes.css',
})
export class Consignes {
  
  selectedDate = signal(new Date());
  salles = sallesJson;
  selectedSalle = signal(this.salles[0]);
  consigne = signal(21);

  ngOnInit() {
    this.selectedSalle.set(this.salles[0]);
  }

  get consigneValue() {
    return this.consigne();
  }

  set consigneValue(v: number) {
    this.consigne.set(v);
  }

  constructor() {
  }

  private readonly min = -10;
  private readonly max = 40;

  fillPercent = computed(() => {
    const v = this.consigne();
    const clamp = Math.max(this.min, Math.min(this.max, v));
    return Math.round(((clamp - this.min) / (this.max - this.min)) * 100);
  });

  accentColor = computed(() => {
    const t = this.consigne();
    if (t <= 0) return '#5db8ff';
    if (t <= 15) return '#7be1ff';
    if (t <= 25) return '#ffd36b';
    if (t <= 32) return '#ff9a5a';
    return '#ff6b6b';
  });

  getFillPercent(): number {
    return this.fillPercent();
  }

  getAccentColor(): string {
    return this.accentColor();
  }

  getAriaLabel(): string {
    return `Consigne de température actuelle : ${this.consigne} degrés Celsius`;
  }

  applyConsigne(): void {
    this.fillPercent();
  }
  
  changeTemperature() {
    // TODO: envoyer la nouvelle consigne au backend REST
    console.log(`Nouvelle consigne : ${this.consigne()} °C`);
  }
}
