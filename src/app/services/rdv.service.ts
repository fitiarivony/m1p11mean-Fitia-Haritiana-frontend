import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Rdv, RdvFull, RdvService } from '../interfaces/rdv'
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

  check_horaire (rdv: Rdv, emps: Emp[], services: Service[]) {
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

    return this.check_disponibilite(rdv.rdv_service)
  }

  add_rdv (rdv: Rdv, emps: Emp[], services: Service[]) {
    for (let index = 0; index < rdv.rdv_service.length; index++) {
      rdv.rdv_service[index].ordre = index + 1
    }
    console.log(emps)

    if (this.check_horaire(rdv, emps, services)) {
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
  check_disponibilite (rdv_service: RdvService[]) {
    return this.http.post('http://localhost:8000/rdv/dispo/', {
      rdv_service: rdv_service
    })
  }
  getTaches () {
    return this.http.get<RdvFull[]>('http://localhost:8000/rdv/today/', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
  }
}
