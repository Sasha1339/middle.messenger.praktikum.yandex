export class FormContainer {
  public fields: Record<string, string> = {};

  constructor(form: HTMLFormElement) {
    this.fields = this.buildFieldForm(form);
  }

  buildFieldForm(form: HTMLFormElement): Record<string, string> {
    const fieldInput = form.querySelectorAll('input');
    const result: Record<string, string> = {};
    if (fieldInput) {
      for (const field of fieldInput) {
        result[field.name] = field.value;
      }
    }
    return result;
  }
}
