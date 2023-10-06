import Locale from './Locale'
import IContentMap from './IContentMap'
import LocalizationRepository from './LocalizationRepository'

class LocalizationService {
  private readonly localizationRepository: LocalizationRepository
  private _currentLocale: Locale
  public readonly defaultLocale: Locale

  constructor(defaultLocale: Locale, localizationRepository: LocalizationRepository) {
    this.localizationRepository = localizationRepository
    this._currentLocale = defaultLocale
    this.defaultLocale = defaultLocale
  }

  public trySetLocaleOrDefault(localeId?: string) {
    if (!this.localizationRepository.hasLocalizationWithLocaleId(localeId)) {
      this._currentLocale = this.defaultLocale
      return
    }

    this._currentLocale = this.localizationRepository.tryGetLocalizationByLocaleId(localeId).locale
  }

  public getLocales(): ReadonlyArray<Locale> {
    return this.localizationRepository.all().map(localization => localization.locale)
  }

  public getLocalizedTextOrDefault(key: keyof IContentMap): string {
    const currentLocalizedText = this.localizationRepository.tryGetLocalizationByLocaleId(this.currentLocale.id).tryGetLocalizedText(key)
    if (!currentLocalizedText) {
      return this.localizationRepository.tryGetLocalizationByLocaleId(this.defaultLocale.id).tryGetLocalizedText(key)
    }
    return currentLocalizedText
  }

  public get currentLocale(): Readonly<Locale> {
    return this._currentLocale
  }
}

export default LocalizationService
