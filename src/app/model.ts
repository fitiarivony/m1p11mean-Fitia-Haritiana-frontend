import { Service } from "./interfaces/service"

export interface Login {
  identifiant: string
  mdp: string
}
export interface Genre {
  _id: string
  nomGenre: string
}
export interface Employe {
  _id: string
  identifiant: string
  mdp: string
  dateDeNaissance: Date
  nom: string
  numeroCIN: string
  prenom: string
  genre: Genre
}
export interface Horaire {
  jour: number
  debut: Date
  fin: Date
}

export interface FormEmploye {
  identifiant: string
  mdp: string
  dateDeNaissance: string
  nom: string
  numeroCIN: string
  prenom: string
  genre: string
  services: string[]
  horaire: Horaire[]
}
export interface EmployeName {
  _id: string
  nom: string
  prenom: string
}
export interface ClientName {
  _id: string
  nom_client: string
  prenom_client: string
}

export interface FormOffre {
  nomOffreSpeciale: string
  description: string
  service: string
  reduction: number
  clientVises?:string[]
}
export interface Offre {
  _id:string
  nomOffreSpeciale: string
  description: string
  service: Service
  reduction: number
}
