export interface Login {
  identifiant: string
  mdp: string
}
export interface Genre {
  _id:string
  nomGenre:string
}
export interface Employe {
  _id:string
  identifiant: string
  mdp: string
  dateDeNaissance: Date
  nom: string
  numeroCIN: string
  prenom: string
  genre: Genre
}
export interface FormEmploye{
  identifiant: string
  mdp: string
  dateDeNaissance: string
  nom: string
  numeroCIN: string
  prenom: string
  genre: string
}
