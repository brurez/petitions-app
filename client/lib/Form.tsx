export const Form = {
    // creates an object from the form fields
    serialize(form: HTMLFormElement) {
        var obj: any = {};
        var formData = new FormData(form);
        // @ts-ignore
        for (var key of formData.keys()) {
            // @ts-ignore
            obj[key] = formData.get(key);
        }
        return obj
    }
}
