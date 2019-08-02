import factory from './fetch-api.service';

const init = () => {
  factory.getPosts().then((result) => {
    // eslint-disable-next-line
    console.log(result);
  }).catch((error) => {
    // eslint-disable-next-line
    console.log('Error ', error);
  });
};

init();
