export class Answer {
  public text!: string;
  public intent: string;

  constructor(text: string, intent: string) {
    this.text = text;
    this.intent = intent;
  }

}
