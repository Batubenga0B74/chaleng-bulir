export interface CreateProvider{
  nome: string
  email: string
  nif: string
  senha: string


  service_name:  string
  descricao: string
  preco: string
}

export interface CreateService{
  nome:  string
  descricao: string
  preco: string
  providersId: number
}