import { connect } from 'mongoose';
import { mongodb } from '../../config.json';
connect(
  mongodb.url,
  {
    useNewUrlParser: true,
    user: mongodb.user,
    pass: mongodb.pass,
  },
);
