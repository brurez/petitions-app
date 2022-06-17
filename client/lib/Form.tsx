export const Form = {
    serialize(form: HTMLFormElement) {
        var obj = {};
        var formData = new FormData(form);
        // @ts-ignore
        for (var key of formData.keys()) {
            // @ts-ignore
            obj[key] = formData.get(key);
        }
        return obj
    }
}
