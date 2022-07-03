function myPromise() {
  new Promise((_, reject) =>
    setTimeout(
      () =>
        reject({
          error: '[API] The call is rejected with an error',
        }),
      1000
    )
  ).then(
    (data) => console.log(data.data),
    (error) => console.log(error.error)
  );
}
 
myPromise();
