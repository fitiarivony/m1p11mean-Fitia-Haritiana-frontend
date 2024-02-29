import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl='https://m1p11mean-fitia-haritiana-backend.onrender.com/token';
  isLoggedIn: boolean = false;
  links:any=[];
  managersLink= [
    {
      label: 'Statistiques',
      icon: 'pi pi-chart-line',
      routerLink: ['/manager/stat'],
    },
    {
      label: 'Services',
      icon: 'fa-solid fa-bell-concierge',
      items: [
        {
          label: 'Créer un service',
          icon: 'pi pi-plus',
          routerLink: ['/services/create'],
        },
        {
          label: 'Lister les services',
          icon: 'pi pi-list',
          routerLink: ['/services/list'],
        },
      ],
    },
    {
    label: 'Dépenses',
    icon: 'fa-solid fa-bell-concierge',
    items: [
      {
        label: 'Créer une dépense',
        icon: 'pi pi-plus',
        routerLink: ['/depenses/create'],
      },
      {
        label: 'Lister les dépenses',
        icon: 'pi pi-list',
        routerLink: ['/depenses/list'],
      },
    ],
  },
  {
    label: 'Offres spéciales',
    icon: 'fa-regular fa-bell',
    items: [
      {
        label: 'Créer une offre spéciale',
        icon: 'pi pi-plus',
        routerLink: ['/offre/add'],
      },
      {
        label: 'Lister les offres spéciales',
        icon: 'pi pi-list',
        routerLink: ['/offre/liste'],
      },
    ],
  },
    {
      label: 'Employé',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Ajouter un employé',
          icon: 'pi pi-plus',
          routerLink: ['/emps/add'],
        },
        {
          label: 'Lister les employés',
          icon: 'pi pi-list',
          routerLink: ['/emps'],
        },
      ],

    },


  ];
  employeLinks=[
    {
      label: 'Afficher les rendez-vous',
      icon: 'pi pi-calendar',
      routerLink: ['/rdv/show'],
    },
    {
      label: 'Suivi des rendez-vous',
      icon: 'pi pi-calendar-times',
      routerLink: ['/emp/rdv/suivi'],
    },
    {
      label: 'Profil et horaire',
      icon: 'pi pi-user',
      routerLink: ['/emps/show/'+localStorage.getItem('id')],
    },
  ];
  clientLinks=[
    {
      label: 'Prise de rendez-vous',
      icon: 'pi pi-calendar-plus',
      routerLink: ['/prise-rdv'],
    },
    {
      label: 'Historique des rendez-vous',
      icon: 'pi pi-calendar',
      routerLink: ['/client/histo'],
    },
    {
      label: 'Gestion des préférences',
      icon: 'pi pi-heart',
      items:[
        {
          label:'Services',
          icon:'fa-solid fa-bell-concierge',
          routerLink: ['/client/pref/service'],
        },
        {
          label:'Employés',
          icon:'pi pi-user',
          routerLink: ['/client/preference'],
        }
      ]

    }
  ]
  constructor(private http:HttpClient) { }
  logout(){
    return this.http.delete(`${this.apiUrl}`.concat('/logout/'+localStorage.getItem('id')),{
      headers:{
        Authorization:  'Bearer ' + localStorage.getItem('token'),
      }
    });
  }


}
