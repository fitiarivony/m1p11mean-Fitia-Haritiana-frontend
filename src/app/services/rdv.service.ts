import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Rdv, RdvFull, RdvFullSuivi, RdvService } from '../interfaces/rdv'
import { Emp, Horaire, HoraireString } from '../model'
import { Service } from '../interfaces/service'

@Injectable({
  providedIn: 'root'
})
export class Rdv_Service {
  constructor (private http: HttpClient) {}
  prepare_prise_rdv () {
    return this.http.get<any>(
      'http://localhost:8000/rdv/prise-rdv/' + localStorage.getItem('id')
    )
  }
  in_horaire (date: Date, horaire: HoraireString, duree: number) {
    let farany = new Date(date)
    farany.setMinutes(duree + farany.getMinutes())

    let debutHeureMinute = horaire.debut.split(':')
    let finHeureMinute = horaire.fin.split(':')
    let begin = new Date(date)
    let end = new Date(date)
    begin.setHours(parseInt(debutHeureMinute[0]))
    begin.setMinutes(parseInt(debutHeureMinute[1]))

    end.setHours(parseInt(finHeureMinute[0]))
    end.setMinutes(parseInt(finHeureMinute[1]))
    return this.interieur_interval(date, farany, begin, end)
  }
  interieur_interval (a_start: Date, a_end: Date, b_start: Date, b_end: Date) {
    //A interieur de B
    return a_start > b_start && a_end < b_end
  }

  check_horaire (rdv: Rdv, emps: Emp[], services: Service[],idrdv: string|undefined) {
    let date = new Date(rdv.date_rdv)
    console.log('Taille', rdv.rdv_service.length)

    for (const element of rdv.rdv_service) {
      let employe = element
      let info_emp = emps.filter(
        emp => emp._id.toString() == employe.id_employe.toString()
      )[0]
      let service = services.filter(
        service => service._id.toString() == employe.id_service.toString()
      )[0]
      let horaires: HoraireString[] = info_emp.horaire.filter(
        horaire => horaire.jour === date.getDay()
      )
      let inside_horaire = false
      for (const horaire of horaires) {
        console.log('check horaire')
        if (this.in_horaire(date, horaire, service.duree)) {
          inside_horaire = true
          break
        }
      }
      if (!inside_horaire) {
        throw new Error('Tsy anatin horaire')
      }
      console.log('Check disponibilité')
      let farany = new Date(date)
      farany.setMinutes(service.duree + farany.getMinutes())
      let manomboka = new Date(date)
      element.datedebut = manomboka
      element.datefin = farany
      date.setMinutes(service.duree + date.getMinutes())
    }
    console.log('Nety horaire')

    return this.check_disponibilite(rdv.rdv_service,idrdv)
  }

  add_rdv (rdv: Rdv, emps: Emp[], services: Service[]) {
    for (let index = 0; index < rdv.rdv_service.length; index++) {
      rdv.rdv_service[index].ordre = index + 1
    }
    console.log(emps)

    if (this.check_horaire(rdv, emps, services,undefined)) {
      console.log('Goooooo')
      return this.http.post<Rdv>('http://localhost:8000/rdv', rdv, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
    }

    return null
  }
  list_rdv_emp () {
    return this.http.get<RdvFull[]>('http://localhost:8000/rdv', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
  }
  check_disponibilite (rdv_service: RdvService[],idrdv:string|undefined) {
    if (!idrdv) {
      return this.http.post('http://localhost:8000/rdv/dispo/', {
        rdv_service: rdv_service
      })
    }
    console.log("Update");
    return this.http.post('http://localhost:8000/rdv/dispo/'+idrdv, {
      rdv_service: rdv_service
    })
  }
  getTaches() {
    return this.http.get<RdvFullSuivi>('http://localhost:8000/rdv/today/', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    });
  }
  suivi_tache(id_rdv:string,id_employe:string,id_service:string,value:boolean){
    return this.http.post<boolean>('http://localhost:8000/rdv/suivi-tache',{
      id_rdv:id_rdv,
      id_employe:id_employe,
      id_service:id_service,
      value:value
    })
  }
  annulerRdv(idRdv:string){
      return this.http.delete('http://localhost:8000/rdv/'+idRdv,{
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem('token'),
        }
      })
  }
  getRdvById(idRdv:string){
    return this.http.get<any>('http://localhost:8000/rdv/'+idRdv,{
      headers:{
        'Authorization': 'Bearer '+localStorage.getItem('token'),
      }
    })
  }
  update_rdv (rdv: Rdv, emps: Emp[], services: Service[],id_rdv:string) {
    for (let index = 0; index < rdv.rdv_service.length; index++) {
      rdv.rdv_service[index].ordre = index + 1
    }
    console.log(emps)

    if (this.check_horaire(rdv, emps, services,id_rdv)) {
      console.log('Goooooo')
      return this.http.put<Rdv>('http://localhost:8000/rdv/'+id_rdv, rdv, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
    }

    return null
  }
}
