import { Component } from '@angular/core'
import { ChartConfiguration, ChartOptions } from 'chart.js'
import { AvgRdvStat } from 'src/app/model'
import { StatsService } from 'src/app/services/stats.service'

@Component({
  selector: 'app-moyennes',
  templateUrl: './moyennes.component.html',
  styleUrls: ['./moyennes.component.css']
})
export class MoyennesComponent {
  title = 'ng2-charts-demo'
  stats: AvgRdvStat = {
    avgNbDay: [],
    avgNbMonth: []
  }
  avgNbMonth = Array(12).fill(0)
  avgCAMonth = Array(12).fill(0)
  avgNbDay = Array(7).fill(0)
  avgCADay = Array(7).fill(0)

  monthLabels = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre'
  ]
  dayLabels = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ]
  public avgNbMonthData: ChartConfiguration<'line'>['data'] = {
    labels: this.monthLabels,
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: true,
        tension: 0,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  }
  public avgCAMonthData: ChartConfiguration<'line'>['data'] = {
    labels: this.monthLabels,
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: true,
        tension: 0,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  }
  public avgNbDayData: ChartConfiguration<'line'>['data'] = {
    labels: this.dayLabels,
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: true,
        tension: 0,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  }
  public avgCADayData: ChartConfiguration<'line'>['data'] = {
    labels: this.dayLabels,
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: true,
        tension: 0,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  }
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  }
  public lineChartLegend = true

  constructor (private statService: StatsService) {}

  ngOnInit () {
    this.statService.getAvgRdv().subscribe({
      next: v => {
        //collecte
        this.stats = v
        //attribution
        let avgNbMonth = Array(12).fill(0)
        let avgCAMonth = Array(12).fill(0)
        this.stats.avgNbMonth.map(el => {
          avgCAMonth[el._id - 1] = el.avgPrix
          avgNbMonth[el._id - 1] = el.avgCount
        })
        let avgNbDay = Array(7).fill(0)
        let avgCADay = Array(7).fill(0)
        this.stats.avgNbDay.map(el => {
          avgCADay[el._id - 1] = el.avgPrix
          avgNbDay[el._id - 1] = el.avgCount
        })
        this.avgNbMonthData = {
          labels: this.monthLabels,
          datasets: [
            {
              data: avgNbMonth,
              label: 'Nombre moyen par mois',
              fill: true,
              tension: 0,
              borderColor: 'black',
              backgroundColor: 'rgba(255,0,0,0.3)'
            }
          ]
        }
        this.avgCAMonthData = {
          labels: this.monthLabels,
          datasets: [
            {
              data: avgCAMonth,
              label: 'Chiffre d\'affaire moyen par mois',
              fill: true,
              tension: 0,
              borderColor: 'black',
              backgroundColor: 'rgba(0,255,0,0.3)'
            }
          ]
        }
        this.avgNbDayData = {
          labels: this.dayLabels,
          datasets: [
            {
              data: avgNbDay,
              label: 'Nombre moyen par jour',
              fill: true,
              tension: 0,
              borderColor: 'black',
              backgroundColor: 'rgba(255,0,255,0.3)'
            }
          ]
        }
        this.avgCADayData = {
          labels: this.dayLabels,
          datasets: [
            {
              data: avgCADay,
              label: 'Chiffre d\'affaire moyen par jour',
              fill: true,
              tension: 0,
              borderColor: 'black',
              backgroundColor: 'rgba(0,0,255,0.9)'
            }
          ]
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
