import { Component, OnInit } from '@angular/core';
import { RdvFull, RdvFullSuivi } from 'src/app/interfaces/rdv';
import { Rdv_Service } from 'src/app/services/rdv.service';

@Component({
  selector: 'app-suivi-rdv',
  templateUrl: './suivi-rdv.component.html',
  styleUrls: ['./suivi-rdv.component.css'],
})
export class SuiviRdvComponent implements OnInit {
  rdv: RdvFullSuivi = {
    rdv: [],
    total: 0,
  };
  constructor(private rdv_service: Rdv_Service) {}
  ngOnInit(): void {
    this.rdv_service.getTaches().subscribe({
      next: (val) => {
        console.log(val);
        this.rdv = val;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  changeChecking(item: RdvFull) {
    this.rdv_service
      .suivi_tache(
        item.id_rdv,
        item.id_employe._id,
        item.id_service._id,
        item.is_done
      )
      .subscribe({
        next: valiny => {
          console.log(valiny);

          if (valiny) {
            let signe = 1;
            if (!item.is_done) signe = -1;
            this.rdv.total =
              this.rdv.total +
              signe *
                (item.id_service.prix * (item.id_service.comission / 100));
            console.log('Nety');
          }
        },
        error: err => {
          item.is_done = !item.is_done;
          console.log(err);
        },
      });
  }
}
