export class Blog {
    constructor(
        public email: string,
        public contenido: string,
        public departamento: { nombre: string},
        public fecha?: Date,
      ){ }
}