class Locale {
  public readonly id: string
  public readonly languageCode: string

  constructor(id: string, languageCode: string) {
    this.id = id
    this.languageCode = languageCode
  }
}

export default Locale
