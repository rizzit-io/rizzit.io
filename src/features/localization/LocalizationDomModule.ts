import IDomModule from "../dom/IDomModule";
import Localization from "./Localization";
import IContentMap from "./IContentMap";
import Locale from "./Locale";
import LocalizationService from "./LocalizationService";
import LocalizationRepository from "./LocalizationRepository";

class LocalizationDomModule implements IDomModule {
  private readonly localizationService: LocalizationService
  private readonly localizableElements: NodeListOf<Element>
  private readonly localesElement: HTMLElement
  private readonly htmlElement: HTMLHtmlElement
  private readonly urlParams: URLSearchParams

  constructor() {
    this.localizableElements = document.querySelectorAll('*[data-localization-key]')
    this.htmlElement = document.querySelector('html')
    this.localesElement = document.querySelector('.locales')
    this.urlParams = new URLSearchParams(window.location.search)

    const defaultLocalization = this.createDefaultLocalization()

    this.localizationService = new LocalizationService(defaultLocalization.locale, new LocalizationRepository([
      defaultLocalization,
      new Localization(new Locale('nl-nl', 'nl'), {
        title: 'rizzit - Vakmanschap waar het telt',
        description: 'Wij maken hoge kwaliteit maatwerk oplossingen voor uw IT problemen.',
        contactMailButton: 'contacteren',
        contactTelephoneButton: 'bel'
      })
    ]))
  }

  public run(): void {
    const locale = this.urlParams.get('locale')
    this.changeLocaleTo(locale, this.localizableElements, this.localizationService, this.htmlElement)

    const buttons = this.createButtons(this.localizationService.getLocales(), this.localizationService.currentLocale)
    buttons.map(button =>
      button.addEventListener('click', () => {
        const defaultLocaleId = this.localizationService.defaultLocale.id
        const localeId = button.getAttribute('data-locale-id')
        this.urlParams.set('locale', localeId)
        window.history.replaceState({}, '', defaultLocaleId !== localeId ? `?${this.urlParams.toString()}` : '/')
        this.changeLocaleTo(localeId, this.localizableElements, this.localizationService, this.htmlElement)
        buttons.map(button => {
          button.classList.remove('active')
          if (button.getAttribute('data-locale-id') === this.localizationService.currentLocale.id) {
            button.classList.add('active')
          }
        })
        }
      )
    )

    const buttonsWithDividers = buttons.map(button => [button, this.createDivider()]).flat()
    buttonsWithDividers.pop()

    this.localesElement.append(...buttonsWithDividers)
  }

  private createDefaultLocalization(): Localization {
    const defaultLocalizedContent: Partial<IContentMap> = {}

    this.localizableElements.forEach(element => {
      defaultLocalizedContent[element.getAttribute('data-localization-key')] = element.textContent
    })

    const id = this.htmlElement.getAttribute('data-locale-id')
    const languageCode = this.htmlElement.getAttribute('lang')
    const locale = new Locale(id, languageCode)

    return new Localization(locale, defaultLocalizedContent)
  }

  private changeLocaleTo(
    locale: string,
    localizableElements: NodeListOf<Element>,
    localizationService: LocalizationService,
    htmlElement: HTMLHtmlElement
  ): void {
    localizationService.trySetLocaleOrDefault(locale)
    localizableElements.forEach(element => {
      element.textContent = localizationService.getLocalizedTextOrDefault(element.getAttribute('data-localization-key') as keyof IContentMap)
    })

    htmlElement.setAttribute('data-locale-id', localizationService.currentLocale.id)
    htmlElement.setAttribute('lang', localizationService.currentLocale.languageCode)
  }

  private createButtons(locales: ReadonlyArray<Locale>, currentLocale: Locale): Element[] {
    const buttons: Element[] = []
    for (const locale of locales) {
      const button = document.createElement('button')
      const span = document.createElement('span')

      span.textContent = locale.languageCode
      button.classList.add('link-button')
      button.appendChild(span)
      button.setAttribute('data-locale-id', locale.id)

      if (currentLocale.id === locale.id) {
        button.classList.add('active')
      }

      buttons.push(button)
    }

    return buttons
  }

  private createDivider(): Element {
    const divider = document.createElement('div')
    divider.classList.add('divider')
    return divider
  }
}

export default LocalizationDomModule
