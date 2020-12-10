export class Usuario {
    constructor(
        public email: string,
        public rol: { nombre: string},
        public departamento:  { nombre: string},
      ){ }
}

export class User {
    constructor(
        public id: string,
        public email: string,
        public password: string,
      ){ }
}