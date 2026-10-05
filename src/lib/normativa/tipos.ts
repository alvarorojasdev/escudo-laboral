export interface ArticuloNormativo {
  /** Nombre de la norma, tal como debe citarse. Ej: 'Resolución 0312 de 2019' */
  norma: string
  /** Identificador del artículo dentro de la norma. Ej: '16' o '2.2.4.6.8' */
  articulo: string
  /** Epígrafe del artículo */
  titulo: string
  /** Texto del articulado, fiel a la norma */
  texto: string
  /**
   * Palabras clave para la búsqueda: en minúscula, sin tildes, incluyendo
   * sinónimos y la forma en que lo diría un empresario pyme.
   */
  temas: string[]
  /**
   * Se entrega entero aunque supere el tope de caracteres. Para tablas: el
   * recorte elige frases por las palabras de la pregunta, y en una tabla eso
   * puede dejar afuera justo la fila que aplica a quien pregunta.
   */
  sinRecorte?: boolean
  /**
   * Artículos de otras normas que este texto nombra expresamente. Quedan
   * respaldados cuando este se entrega: repetir la remisión que hace la norma
   * no es citar de memoria. Formato `'Norma|articulo'`.
   */
  remiteA?: string[]
  /**
   * Nota que se calcula con la pregunta y se entrega pegada al texto. Para
   * cuentas que el modelo hace mal aunque tenga la norma a la vista.
   */
  notaSegunConsulta?: (consulta: string) => string | null
}
