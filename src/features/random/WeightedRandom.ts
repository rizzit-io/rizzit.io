import IWeightedRandomOption from './IWeightedRandomOption'
import IRandom from "./IRandom";

class WeightedRandom<TItem> implements IRandom<TItem> {
  private options: IWeightedRandomOption<TItem>[]

  constructor(options: IWeightedRandomOption<TItem>[]) {
    this.options = options
  }

  public next(): TItem {
    let i

    const weights = [this.options[0].weight]
    for (i = 1; i < this.options.length; i++) {
      weights[i] = this.options[i].weight + weights[i - 1];
    }

    const random = Math.random() * weights[weights.length - 1];

    for (i = 0; i < weights.length; i++) {
      if (weights[i] > random) {
        break
      }
    }

    return this.options[i].item
  }
}

export default WeightedRandom
