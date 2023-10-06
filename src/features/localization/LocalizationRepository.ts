import Localization from './Localization'

class LocalizationRepository {
  private readonly localizationMap: Record<string, Localization>

  constructor(localizations: Localization[]) {
    this.localizationMap = localizations.reduce((previousValue, currentValue) => {
      previousValue[currentValue.locale.id] = currentValue
      return previousValue
    }, {})
  }

  public hasLocalizationWithLocaleId(localeId: string): boolean {
    return !!this.localizationMap[localeId]
  }

  public tryGetLocalizationByLocaleId(localeId: string): Localization | undefined {
    return this.localizationMap[localeId]
  }

  public all(): ReadonlyArray<Localization> {
    return Object.values(this.localizationMap)
  }
}

export default LocalizationRepository
