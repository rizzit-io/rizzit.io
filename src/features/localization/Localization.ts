import Locale from './Locale'
import IContentMap from './IContentMap'

class Localization {
  public readonly locale: Locale
  private readonly localizedContent: Partial<IContentMap>

  constructor(locale: Locale, localizedContent: Partial<IContentMap>) {
    this.locale = locale
    this.localizedContent = localizedContent
  }

  public tryGetLocalizedText(key: keyof IContentMap): string | undefined {
    return this.localizedContent[key]
  }
}

export default Localization
