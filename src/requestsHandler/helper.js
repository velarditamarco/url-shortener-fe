

export const ErrorHandling = (errors) => {
    let err =[]
    Object.values(errors).forEach(x => err.push(x));
    return err;
}