import { Component } from '@angular/core'
import { ChartConfiguration, ChartOptions } from 'chart.js'
import { AvgRdvStat, BeneficeMois, TempsMoyen } from 'src/app/model'
import { StatsService } from 'src/app/services/stats.service'
import { Chart } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-moyennes',
  templateUrl: './moyennes.component.html',
  styleUrls: ['./moyennes.component.css'],
  providers:[MessageService]
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
    responsive: false,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        ticks: {
          stepSize: 1,
        },
      },
    },
  }
  public lineChartLegend = true
   //temps moyen de travail de chaque employe
   tempsMoyen:TempsMoyen[]=[];
   dataTempsMoyen:{}={};
   options:any;
   //Benefice par mois
   beneficemois:BeneficeMois[]=[];
   dataBeneficeMois:{}={};
   optionBeneficeMois:any;

  constructor (private statService: StatsService,private messageService:MessageService) {}
  initTemps_Moyen(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.dataTempsMoyen={
      labels: this.tempsMoyen.map((emp:TempsMoyen) =>emp.employe.nom+"  "+emp.employe.prenom),
      datasets: [
        {
            data:  this.tempsMoyen.map((emp:TempsMoyen) =>emp.isa),
            backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
    ]
    }
    this.options = {
      cutout: '60%',
      plugins: {
          legend: {
              labels: {
                  color: textColor

              }
          },
          tooltip: {
            callbacks: {
                label: function(context: any) {
                  let diffMs:number=context.dataset.data;
                  let tempsTravail="";
                  if (diffMs >= 3600000) {
                    // Si la durée est d'au moins 1 heure (3600000 millisecondes)
                    const heures = Math.floor(diffMs / 3600000) // Calculer les heures
                    const minutes = Math.round((diffMs % 3600000) / 60000) // Calculer les minutes restantes
                    tempsTravail = `${heures} heure(s) ${minutes} minute(s)`
                  } else {
                    // Si la durée est inférieure à 1 heure
                    const minutes = Math.ceil(diffMs / 60000) // Calculer les minutes
                    tempsTravail = `${minutes} minute(s)`
                  }
                  return tempsTravail
                }
            }
        }
      },

  };
  }
  initBeneficeMois(benefice:any[]){

    benefice.forEach(element => {
      // console.log(element);

      element.benefice=element.recette-element.depense-element.autre_depense
      element.benefice=element.benefice<0?0:element.benefice
      let daty=new Date();
      daty.setFullYear(element.annee,element.mois-1,1);
      daty.setHours(0);
      daty.setMinutes(0);
      daty.setSeconds(0);
      element.daty=daty
      // return element
    });
    benefice=benefice.sort((a, b) =>- b.daty.getTime() + a.daty.getTime());
    // console.log(benefice);

    this.beneficemois=benefice;
     const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.dataBeneficeMois={
      labels: this.beneficemois.map(element=>element.daty.toISOString()),
      datasets: [
        {
          label: 'Bénéfice par mois en fonction des dépenses',
            data: this.beneficemois.map(element=>element.benefice),
            backgroundColor: 'rgb(255,56,70,1)',
            hoverBackgroundColor: 'rgb(255,56,70,1)',
        }
      ]
    }
    const currentDate = new Date();
    const beginningOfYear = new Date(this.beneficemois[0].annee, 0, 1);
    // Get the end of the year
    const endOfYear = new Date(this.beneficemois[this.beneficemois.length-1].annee, 11, 31);

    this.optionBeneficeMois={
      title: {
        display: true,
        text: 'Time Chart'
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'month',
            displayFormats: {
              month: 'MM-yyyy'
            }

          },
          scaleLabel: {
            display: true,
            labelString: 'Date'
          },
            min: beginningOfYear,
            max: endOfYear,
        },
        y: {
          scaleLabel: {
            display: true,
            labelString: 'Value'
          },
        }

      },

      plugins: {
        legend: {
          display: true
        },
        tooltip:{
          enabled: false
        }

      },

    };
  }

  ngOnInit () {
    this.statService.getAvgRdv().subscribe({
      next: valiny => {
        // console.log(valiny);

        this.tempsMoyen=valiny.tempsMoyen;
        this.initTemps_Moyen();
        this.initBeneficeMois(valiny.beneficemois);
        let v=valiny.avgrdv;
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
              backgroundColor: 'rgba(255,0,0,0.3)',
              pointBackgroundColor: 'rgba(148,159,177,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(148,159,177,0.8)',
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
              backgroundColor: 'rgba(0,255,0,0.3)',
              pointBackgroundColor: 'rgba(148,159,177,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(148,159,177,0.8)',
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
              backgroundColor: 'rgba(255,0,255,0.3)',
              pointBackgroundColor: 'rgba(148,159,177,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(148,159,177,0.8)',
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
              backgroundColor: 'rgba(0,0,255,0.9)',
              pointBackgroundColor: 'rgba(148,159,177,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            }
          ]
        }
      },
      error: err => {
        // console.log(err)
        this.messageService.add({severity: 'error', detail:err.error})
      }
    })
  }
}
